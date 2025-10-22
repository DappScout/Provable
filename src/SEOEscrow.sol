// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SEOFinance.sol";
import "./SEOArbiter.sol";

/**
 * @title SEOEscrow
 * @notice Main contract that manages job lifecycle and delegates payment logic to SEOFinance.
 */
contract SEOEscrow is ReentrancyGuard {
    using SafeERC20 for IERC20;
    enum JobState { Created, Signed, Funded, InProgress, Completed, Disputed, Resolved, Cancelled }

    struct Job {
        address client;
        address freelancer;
        address token; // address(0) for native ETH
        uint256 budget;
        uint256 createdAt;
        uint256 deadline;
        JobState state;
        bool clientLocked;
        bool freelancerLocked;
        uint256 lockedAmount;
    }

    uint256 public jobCount;
    mapping(uint256 => Job) public jobs;

    SEOFinance public finance;
    SEOArbiter public arbiter;

    event JobCreated(uint256 indexed jobId, address indexed client, address indexed freelancer, address token, uint256 budget);
    event ContractSigned(uint256 indexed jobId, address indexed freelancer);
    event FundsLocked(uint256 indexed jobId, uint256 amount);
    event FundsPaidAndLocked(uint256 indexed jobId, uint256 amount);
    event JobCompleted(uint256 indexed jobId);
    event DisputeOpened(uint256 indexed jobId, address indexed by);
    event DisputeResolved(uint256 indexed jobId, uint256 clientAmount, uint256 freelancerAmount);
    event JobCancelled(uint256 indexed jobId);

    constructor(address payable _finance, address _arbiter) {
        require(_finance != address(0), "Finance address cannot be zero");
        require(_arbiter != address(0), "Arbiter address cannot be zero");
        finance = SEOFinance(_finance);
        arbiter = SEOArbiter(_arbiter);
    }

    modifier onlyClient(uint256 jobId) {
        require(msg.sender == jobs[jobId].client, "Not client");
        _;
    }

    modifier onlyFreelancer(uint256 jobId) {
        require(msg.sender == jobs[jobId].freelancer, "Not freelancer");
        _;
    }

    modifier inState(uint256 jobId, JobState s) {
        require(jobs[jobId].state == s, "Invalid state");
        _;
    }

    modifier onlyArbiter() {
        require(msg.sender == address(arbiter), "Not arbiter");
        _;
    }

    /// createAJob(): called by client to create a job listing
    function createAJob(address _token, address _freelancer, uint256 _budget, uint256 _deadline) external returns (uint256) {
        require(_budget > 0, "Budget must be > 0");
        require(_deadline > block.timestamp, "Deadline must be in future");

        jobCount++;
        jobs[jobCount] = Job({
            client: msg.sender,
            freelancer: _freelancer,
            token: _token,
            budget: _budget,
            createdAt: block.timestamp,
            deadline: _deadline,
            state: JobState.Created,
            clientLocked: false,
            freelancerLocked: false,
            lockedAmount: 0
        });

        emit JobCreated(jobCount, msg.sender, _freelancer, _token, _budget);
        return jobCount;
    }

    // freelancer accepts the job and signs the contract
    function signContract(uint256 jobId) external inState(jobId, JobState.Created) onlyFreelancer(jobId) {
        Job storage j = jobs[jobId];
        require(msg.sender != j.client, "Client cannot sign");

        j.state = JobState.Signed;

        emit ContractSigned(jobId, msg.sender);
    }

    // client deposits funds into escrow (ERC20 or ETH)
    function payAndLockFunds(uint256 jobId, uint256 amount) external payable nonReentrant onlyClient(jobId) inState(jobId, JobState.Signed) {
        Job storage j = jobs[jobId];
        require(amount == j.budget, "Must pay full budget");

        if (j.token == address(0)) {
            require(msg.value == amount, "ETH mismatch");
            finance.depositETH{value: amount}(jobId);
        } else {
            require(msg.value == 0, "Do not send ETH for ERC20 job");
            IERC20(j.token).safeTransferFrom(msg.sender, address(finance), amount);
            finance.depositERC20(jobId, j.token, amount);
        }

        j.lockedAmount = amount;
        j.state = JobState.Funded;
        j.clientLocked = true;

        emit FundsPaidAndLocked(jobId, amount);
    }

    // optional freelancer stake
    function lockFunds(uint256 jobId) external payable nonReentrant onlyFreelancer(jobId) inState(jobId, JobState.Funded) {
        require(msg.value > 0, "Must send some stake");
        finance.depositETH{value: msg.value}(jobId);
        jobs[jobId].freelancerLocked = true;
        emit FundsLocked(jobId, msg.value);
    }

    // freelancer marks job as completed
    function markComplete(uint256 jobId) external onlyFreelancer(jobId) inState(jobId, JobState.Funded) {
        jobs[jobId].state = JobState.Completed;
        emit JobCompleted(jobId);
    }

    // handles dispute resolution and payouts
    function resolveDispute(uint256 jobId, uint256 clientShare, uint256 freelancerShare) external nonReentrant onlyArbiter {
        Job storage j = jobs[jobId];
        require(j.state == JobState.Disputed || j.state == JobState.Completed, "Not disputable");

        j.state = JobState.Resolved;

        if (j.token == address(0)) {
            if (clientShare > 0) finance.releaseETH(jobId, payable(j.client), clientShare);
            if (freelancerShare > 0) finance.releaseETH(jobId, payable(j.freelancer), freelancerShare);
        } else {
            if (clientShare > 0) finance.releaseERC20(jobId, j.token, j.client, clientShare);
            if (freelancerShare > 0) finance.releaseERC20(jobId, j.token, j.freelancer, freelancerShare);
        }

        j.lockedAmount = 0;
        emit DisputeResolved(jobId, clientShare, freelancerShare);
    }

    function openDispute(uint256 jobId) external {
        Job storage j = jobs[jobId];
        require(msg.sender == j.client || msg.sender == j.freelancer, "Not party");
        require(j.state == JobState.Funded || j.state == JobState.Completed, "Invalid state");
        j.state = JobState.Disputed;
        emit DisputeOpened(jobId, msg.sender);
    }

    function cancelJob(uint256 jobId) external onlyClient(jobId) {
        Job storage j = jobs[jobId];
        require(j.state == JobState.Created || j.state == JobState.Signed, "Cannot cancel");
        j.state = JobState.Cancelled;
        emit JobCancelled(jobId);
    }
}
