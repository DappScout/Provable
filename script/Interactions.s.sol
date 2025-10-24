// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {SEOEscrow} from "../src/SEOEscrow.sol";

/**
 * @title RegisterAutomation
 * @notice Script to help register Chainlink Automation upkeep
 * @dev Provides information and helper functions for Chainlink Automation setup
 */
contract RegisterAutomation is Script {

    /**
     * @notice Main entry point for the script
     * @dev Provides instructions for manual Chainlink Automation registration
     */
    function run() external {
        HelperConfig helperConfig = new HelperConfig();
        // For now, we'll use a placeholder address - user needs to update this
        address escrowAddress = address(0); // UPDATE THIS AFTER DEPLOYMENT

        printAutomationInstructions(escrowAddress, helperConfig.getConfig().linkToken);
    }

    /**
     * @notice Print instructions for Chainlink Automation registration
     * @param escrowAddress Address of the deployed SEOEscrow contract
     * @param linkToken Address of LINK token on current chain
     */
    function printAutomationInstructions(address escrowAddress, address linkToken) public pure {
        console.log("\n==================================================");
        console.log("CHAINLINK AUTOMATION REGISTRATION GUIDE");
        console.log("==================================================\n");

        console.log("STEP 1: Get LINK Tokens");
        console.log("  Base Sepolia Faucet: https://faucets.chain.link/base-sepolia");
        console.log("  You need ~5 LINK to fund the upkeep\n");

        console.log("STEP 2: Go to Chainlink Automation");
        console.log("  URL: https://automation.chain.link");
        console.log("  Switch to Base Sepolia network\n");

        console.log("STEP 3: Register New Upkeep");
        console.log("  Click 'Register new Upkeep'");
        console.log("  Select: 'Custom logic' trigger\n");

        console.log("STEP 4: Configuration");
        console.log("  Target contract address:", escrowAddress);
        console.log("  Upkeep name: SEO Escrow Auto-Complete");
        console.log("  Gas limit: 500000");
        console.log("  Starting balance (LINK): 5");
        console.log("  Check data: 0x\n");

        console.log("STEP 5: Confirm and Fund");
        console.log("  Approve LINK spend in wallet");
        console.log("  Confirm transaction");
        console.log("  Wait for confirmation\n");

        console.log("==================================================");
        console.log("VERIFICATION");
        console.log("==================================================\n");

        console.log("Test checkUpkeep:");
        console.log("  cast call", escrowAddress);
        console.log('  "checkUpkeep(bytes)" "0x"');
        console.log("  --rpc-url https://sepolia.base.org\n");

        console.log("LINK Token Address:", linkToken);
        console.log("\n==================================================\n");
    }
}

/**
 * @title CheckUpkeep
 * @notice Script to manually check if upkeep is needed
 * @dev Useful for debugging Chainlink Automation
 */
contract CheckUpkeep is Script {

    /**
     * @notice Check if upkeep is needed for a specific escrow
     * @param escrowAddress Address of SEOEscrow contract
     */
    function run(address escrowAddress) external view {
        checkUpkeepStatus(escrowAddress);
    }

    /**
     * @notice Check upkeep status for a specific escrow
     * @param escrowAddress Address of SEOEscrow contract
     */
    function checkUpkeepStatus(address escrowAddress) public view {
        console.log("\n==================================================");
        console.log("CHECKING UPKEEP STATUS");
        console.log("==================================================");
        console.log("Escrow Address:", escrowAddress);
        console.log("Chain ID:", block.chainid);

        // Call checkUpkeep (view function)
        (bool upkeepNeeded, bytes memory performData) = SEOEscrow(escrowAddress).checkUpkeep("");

        console.log("\nUpkeep Needed:", upkeepNeeded);

        if (upkeepNeeded) {
            console.log("Perform Data Length:", performData.length);
            console.log("Jobs ready for auto-completion detected!");
        } else {
            console.log("No jobs ready for auto-completion");
        }

        console.log("==================================================\n");
    }
}

/**
 * @title TestJob
 * @notice Script to create a test job for automation testing
 * @dev Creates a job that can be used to test the automation flow
 */
contract TestJob is Script {

    /**
     * @notice Create a test job for automation testing
     * @param escrowAddress Address of SEOEscrow contract
     */
    function run(address escrowAddress) external {
        createTestJob(escrowAddress);
    }

    /**
     * @notice Create a test job for automation testing
     * @param escrowAddress Address of SEOEscrow contract
     */
    function createTestJob(address escrowAddress) public {
        HelperConfig helperConfig = new HelperConfig();
        HelperConfig.NetworkConfig memory config = helperConfig.getConfig();

        console.log("\n==================================================");
        console.log("CREATING TEST JOB");
        console.log("==================================================");

        address freelancer = 0x396955aD695D1290d2C12377Cd2d48fe707fB962;
        uint256 budget = 0.001 ether;
        uint256 deadline = block.timestamp + 1000;

        console.log("Escrow:", escrowAddress);
        console.log("Client:", config.account);
        console.log("Freelancer:", freelancer);
        console.log("Budget:", budget);
        console.log("Deadline:", deadline);

        vm.startBroadcast();

        // Create job
        uint256 jobId = SEOEscrow(escrowAddress).createAJob(
            address(0), // ETH payment
            freelancer,
            budget,
            deadline
        );

        console.log("\n[OK] Job created with ID:", jobId);
        console.log("\nNext steps:");
        console.log("1. Freelancer signs contract");
        console.log("2. Client pays and locks funds");
        console.log("3. Freelancer marks complete");
        console.log("4. Wait 7 days for auto-completion");

        vm.stopBroadcast();

        console.log("==================================================\n");
    }
}

/**
 * @title JobInfo
 * @notice Script to get information about a specific job
 * @dev Useful for debugging and monitoring job state
 */
contract JobInfo is Script {

    /**
     * @notice Get info for a job
     * @dev Usage: forge script script/Interactions.s.sol:JobInfo --sig "run(address,uint256)" <escrowAddress> <jobId>
     */
    function run(address escrowAddress, uint256 jobId) external view {
        getJobInfo(escrowAddress, jobId);
    }

    /**
     * @notice Get detailed information about a job
     * @param escrowAddress Address of SEOEscrow contract
     * @param jobId ID of the job to query
     */
    function getJobInfo(address escrowAddress, uint256 jobId) public view {
        SEOEscrow escrow = SEOEscrow(escrowAddress);

        (
            address client,
            address freelancer,
            address token,
            uint256 budget,
            uint256 createdAt,
            uint256 deadline,
            uint256 completedAt,
            SEOEscrow.JobState state,
            bool clientLocked,
            bool freelancerLocked,
            uint256 lockedAmount
        ) = escrow.jobs(jobId);

        console.log("\n==================================================");
        console.log("JOB INFORMATION");
        console.log("==================================================");
        console.log("Job ID:", jobId);
        console.log("Client:", client);
        console.log("Freelancer:", freelancer);
        console.log("Token:", token);
        console.log("Budget:", budget);
        console.log("Created At:", createdAt);
        console.log("Deadline:", deadline);
        console.log("Completed At:", completedAt);
        console.log("State:", uint8(state), getStateName(state));
        console.log("Client Locked:", clientLocked);
        console.log("Freelancer Locked:", freelancerLocked);
        console.log("Locked Amount:", lockedAmount);

        // Calculate time until auto-completion (if applicable)
        if (state == SEOEscrow.JobState.Completed && completedAt > 0) {
            uint256 autoCompleteTime = completedAt + 7 days;
            if (block.timestamp < autoCompleteTime) {
                uint256 timeLeft = autoCompleteTime - block.timestamp;
                console.log("\nAuto-completion in:", timeLeft, "seconds");
                uint256 daysLeft = timeLeft / 1 days;
                uint256 hoursLeft = (timeLeft % 1 days) / 1 hours;
                console.log("Days remaining:", daysLeft);
                console.log("Hours remaining:", hoursLeft);
            } else {
                console.log("\nReady for auto-completion! [OK]");
            }
        }

        console.log("==================================================\n");
    }

    /**
     * @notice Get human-readable state name
     * @param state Job state enum
     * @return stateName String representation of state
     */
    function getStateName(SEOEscrow.JobState state) internal pure returns (string memory stateName) {
        if (state == SEOEscrow.JobState.Created) return "Created";
        if (state == SEOEscrow.JobState.Signed) return "Signed";
        if (state == SEOEscrow.JobState.Funded) return "Funded";
        if (state == SEOEscrow.JobState.JobDone) return "JobDone";
        if (state == SEOEscrow.JobState.Completed) return "Completed";
        if (state == SEOEscrow.JobState.Disputed) return "Disputed";
        if (state == SEOEscrow.JobState.Resolved) return "Resolved";
        if (state == SEOEscrow.JobState.Cancelled) return "Cancelled";
        return "Unknown";
    }
}