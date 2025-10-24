// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import "./SEOFinance.sol";
import "./SEOArbiter.sol";
import "./Constants.sol";
import "./SEORegistry.sol";

/**
 * @title SEOEscrow
 * @notice Main contract that manages job lifecycle and delegates payment logic to SEOFinance.
 * @dev Implements Chainlink Automation for automatic job completion after review period
 */
contract SEOEscrow is Constants, ReentrancyGuard, AutomationCompatibleInterface {
    using SafeERC20 for IERC20;

    enum JobState {
        Created,
        Signed,
        Funded,
        JobDone,
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
        uint256 completedAt;
        JobState state;
        bool clientLocked;
        bool freelancerLocked;
        uint256 lockedAmount;
    }

    uint256 public jobCount;

    mapping(uint256 => Job) public jobs;
    mapping(address => uint256) public jobsPerClient;

    SEOFinance public finance;
    SEOArbiter public arbiter;
    SEORegistry public registry;

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
    event JobAutoCompleted(uint256 indexed jobId);

    constructor(address payable _finance, address _arbiter, address _registry) {
        require(_finance != address(0) && _arbiter != address(0) && _registry != address(0), "Zero address not allowed");
        finance = SEOFinance(_finance);
        arbiter = SEOArbiter(_arbiter);
        registry = SEORegistry(_registry);
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
        require(_freelancer != address(0), "Freelancer cannot be zero");
        require(_freelancer != msg.sender, "Freelancer cannot be client");

        if (_token != address(0)) {
            require(registry.isAllowed(_token), "Token not allowed");
        }

        require(jobsPerClient[msg.sender] <= MAX_JOBS_PER_CLIENT, "Max jobs reached");
        jobCount++;

        jobs[jobCount] = Job({
            client: msg.sender,
            freelancer: _freelancer,
            token: _token,
            budget: _budget,
            createdAt: block.timestamp,
            deadline: _deadline,
            completedAt: 0,
            state: JobState.Created,
            clientLocked: false,
            freelancerLocked: false,
            lockedAmount: 0
        });

        jobsPerClient[msg.sender]++;

        emit JobCreated(jobCount, msg.sender, _freelancer, _token, _budget);
        return jobCount;
    }

    // freelancer accepts the job and signs the contract
    function signContract(uint256 jobId) external inState(jobId, JobState.Created) onlyFreelancer(jobId) {
        Job storage j = jobs[jobId];
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

        uint256 fee = (amount * PLATFORM_FEE_BPS) / BPS_DENOMINATOR;
        uint256 netAmount = amount - fee;

        if (j.token == address(0)) {
            require(msg.value == amount, "ETH mismatch");
            finance.depositETH{value: amount}(jobId);
        } else {
            require(msg.value == 0, "Do not send ETH for ERC20 job");
            IERC20(j.token).safeTransferFrom(msg.sender, address(finance), amount);
            finance.depositERC20(jobId, j.token, amount);
        }

        j.lockedAmount = netAmount;
        j.state = JobState.Funded;
        j.clientLocked = true;

        emit FundsPaidAndLocked(jobId, amount);
    }

    // freelancer marks job as completed
    function markComplete(uint256 jobId) external onlyFreelancer(jobId) inState(jobId, JobState.Funded) {
        jobs[jobId].state = JobState.Completed;
        jobs[jobId].completedAt = block.timestamp;

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
        jobsPerClient[msg.sender]--;
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
        jobsPerClient[j.client]--;
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
        jobsPerClient[msg.sender]--;
        emit JobCancelled(jobId);
    }

    // ============================================
    // CHAINLINK AUTOMATION FUNCTIONS
    // ============================================

    /**
     * @notice Chainlink Automation calls this to check if upkeep is needed
     * @dev Checks jobs in reverse order (newest first) for completed jobs past review period
     * @return upkeepNeeded True if any jobs need auto-completion
     * @return performData Encoded array of job IDs to process
     */
    function checkUpkeep(bytes calldata /* checkData */)
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        uint256[] memory jobsToProcess = new uint256[](MAX_JOBS_TO_CHECK);
        uint256 count = 0;

        // Start from most recent jobs (more likely to need action)
        for (uint256 i = jobCount; i > 0 && count < MAX_JOBS_TO_CHECK; i--) {
            Job memory j = jobs[i];

            // Auto-release if review period expired after freelancer marked complete
            if (j.state == JobState.Completed && block.timestamp > j.completedAt + REVIEW_PERIOD) {
                jobsToProcess[count++] = i;
            }
        }

        upkeepNeeded = count > 0;
        performData = abi.encode(jobsToProcess, count);
    }

    /**
     * @notice Chainlink Automation calls this to perform the upkeep
     * @dev Auto-confirms jobs that have passed the review period
     * @param performData Encoded array of job IDs and count from checkUpkeep
     */
    function performUpkeep(bytes calldata performData) external override nonReentrant {
        (uint256[] memory jobsToProcess, uint256 count) = abi.decode(performData, (uint256[], uint256));

        for (uint256 i = 0; i < count; i++) {
            uint256 jobId = jobsToProcess[i];
            Job storage j = jobs[jobId];

            // Verify state hasn't changed and review period has passed
            if (j.state == JobState.Completed && block.timestamp > j.completedAt + REVIEW_PERIOD) {
                _autoConfirmJob(jobId);
            }
        }
    }

    /**
     * @notice Internal function to auto-confirm and release funds to freelancer
     * @param jobId The job ID to auto-confirm
     */
    function _autoConfirmJob(uint256 jobId) internal {
        Job storage j = jobs[jobId];
        j.state = JobState.JobDone;

        if (j.token == address(0)) {
            finance.releaseETH(jobId, payable(j.freelancer), j.lockedAmount);
        } else {
            finance.releaseERC20(jobId, j.token, j.freelancer, j.lockedAmount);
        }

        j.lockedAmount = 0;
        jobsPerClient[j.client]--;

        emit JobAutoCompleted(jobId);
    }

    function getJob(uint256 jobId)
        external
        view
        returns (
            address client,
            address freelancer,
            address token,
            uint256 budget,
            uint256 createdAt,
            uint256 deadline,
            uint256 completedAt,
            JobState state,
            bool clientLocked,
            bool freelancerLocked,
            uint256 lockedAmount
        )
    {
        Job storage j = jobs[jobId];
        return (
            j.client,
            j.freelancer,
            j.token,
            j.budget,
            j.createdAt,
            j.deadline,
            j.completedAt,
            j.state,
            j.clientLocked,
            j.freelancerLocked,
            j.lockedAmount
        );
    }
}
