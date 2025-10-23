// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "./BaseTest.sol";

contract SEOEscrowTest is BaseTest {
    event JobCreated(uint256 indexed jobId, address indexed client, address indexed freelancer, address token, uint256 budget);

    function setUp() public override {
        super.setUp();
    }

    function test_CreateJob() public {
        vm.startPrank(client);
        uint256 budget = 1 ether;
        uint256 deadline = block.timestamp + 1 days;
        
        uint256 jobId = escrow.createAJob(address(0), freelancer, budget, deadline);
        
        assertEq(jobId, 1);
        (
            address jobClient,
            address jobFreelancer,
            address jobToken,
            uint256 jobBudget,
            ,,,,,,
        ) = escrow.jobs(jobId);
        
        assertEq(jobClient, client);
        assertEq(jobFreelancer, freelancer);
        assertEq(jobToken, address(0));
        assertEq(jobBudget, budget);
        vm.stopPrank();
    }

    function test_JobLifecycle() public {
        // Create job
        vm.startPrank(client);
        uint256 budget = 1 ether;
        uint256 jobId = escrow.createAJob(address(0), freelancer, budget, block.timestamp + 1 days);
        vm.stopPrank();

        // Sign contract
        vm.prank(freelancer);
        escrow.signContract(jobId);

        // Fund job
        vm.prank(client);
        escrow.payAndLockFunds{value: budget}(jobId, budget);

        // Complete job
        vm.prank(freelancer);
        escrow.markComplete(jobId);

        // Confirm and release
        vm.prank(client);
        uint256 balanceBefore = freelancer.balance;
        escrow.confirmJob(jobId);
        assertEq(freelancer.balance - balanceBefore, budget);
    }

    function test_InvalidJobCreation() public {
        vm.prank(client);
        vm.expectRevert();
        escrow.createAJob(address(0), address(0), 1 ether, block.timestamp + 1 days);
    }

    // add more extensive tests
}
