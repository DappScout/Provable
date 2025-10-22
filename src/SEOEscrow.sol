// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SEOFinance.sol";
import "./SEOArbiter.sol";
import "./Constants.sol";

/**
 * @title SEOEscrow
 * @notice Main contract that manages job lifecycle and delegates payment logic to SEOFinance.
 */
contract SEOEscrow is Constants, ReentrancyGuard {
    using SafeERC20 for IERC20;

    enum JobState {
        Created,
        Signed,
        Funded,
        JobDone,
        InProgress,
        Completed,
        Disputed,
        Resolved,
        Cancelled
    }

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
    uint256 public timeAfterJobCompletion;
    mapping(uint256 => Job) public jobs;
    mapping(address => uint256) public jobsPerClient;

    SEOFinance public finance;
    SEOArbiter public arbiter;

    event JobCreated(
        uint256 indexed jobId, address indexed client, address indexed freelancer, address token, uint256 budget
    );
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

    // called by client to create a job listing
    function createAJob(address _token, address _freelancer, uint256 _budget, uint256 _deadline)
        external
        returns (uint256)
    {
        require(_budget > 0, "Budget must be > 0");
        require(_deadline > block.timestamp, "Deadline must be in future");
        require(_freelancer != msg.sender, "Freelancer cannot be client");

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

        jobsPerClient[msg.sender]++;

        // add a rate limit, 5 jobs per client
        require(jobsPerClient[msg.sender] <= MAX_JOBS_PER_CLIENT, "Max jobs reached");

        // add a minimum budget requirement, e.g., 0.03 ETH
        if (_token == address(0)) {
            require(_budget >= MIN_BUDGET, "Below minimum budget");
        } else {
            _checkMinBudget(_token, _budget);
        }

        emit JobCreated(jobCount, msg.sender, _freelancer, _token, _budget);
        return jobCount;
    }

    function _checkMinBudget(address token, uint256 _budget) internal view {
        uint256 tokenDecimals = 18; // default fallback

        (bool success, bytes memory data) = token.staticcall(abi.encodeWithSignature("decimals()"));

        if (success && data.length == 32) {
            tokenDecimals = abi.decode(data, (uint256));
        }

        uint256 minBudget = 10 ** tokenDecimals;
        require(_budget >= minBudget, "Below minimum ERC20 budget");
    }

    // freelancer accepts the job and signs the contract
    function signContract(uint256 jobId) external inState(jobId, JobState.Created) onlyFreelancer(jobId) {
        Job storage j = jobs[jobId];
        require(msg.sender != j.client, "Client cannot sign");

        j.state = JobState.Signed;

        emit ContractSigned(jobId, msg.sender);
    }

    // client deposits funds into escrow (ERC20 or ETH)
    function payAndLockFunds(uint256 jobId, uint256 amount)
        external
        payable
        nonReentrant
        onlyClient(jobId)
        inState(jobId, JobState.Signed)
    {
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

    // freelancer marks job as completed
    function markComplete(uint256 jobId) external onlyFreelancer(jobId) inState(jobId, JobState.Funded) {
        jobs[jobId].state = JobState.Completed;
        timeAfterJobCompletion = block.timestamp;
        emit JobCompleted(jobId);
    }

    // client confirms job is done and releases funds
    function confirmJob(uint256 jobId) external nonReentrant onlyClient(jobId) inState(jobId, JobState.Completed) {
        jobs[jobId].state = JobState.JobDone;
        if (jobs[jobId].token == address(0)) {
            finance.releaseETH(jobId, payable(jobs[jobId].freelancer), jobs[jobId].lockedAmount);
        } else {
            finance.releaseERC20(jobId, jobs[jobId].token, jobs[jobId].freelancer, jobs[jobId].lockedAmount);
        }
        jobs[jobId].lockedAmount = 0;
    }

    // handles dispute resolution and payouts
    // jakub will modify with chainlink integration later
    function resolveDispute(uint256 jobId, uint256 clientShare, uint256 freelancerShare) external nonReentrant {
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
