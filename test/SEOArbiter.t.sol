// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "./BaseTest.sol";

contract SEOArbiterTest is BaseTest {
    function setUp() public override {
        super.setUp();
    }

    function test_AddArbiter() public {
        address newArbiter = makeAddr("newArbiter");

        vm.prank(arbiter.owner());
        arbiter.addArbiter(newArbiter);

        assertTrue(arbiter.isArbiter(newArbiter));
    }

    function test_DisputeResolution() public {
        uint256 jobId = setupDisputedJob();
        uint256 totalAmount = 1 ether;

        vm.prank(arbiter.owner());
        arbiter.addArbiter(arbiterUser);

        vm.prank(arbiterUser);
        arbiter.resolveDisputeOnEscrow(jobId, totalAmount / 2, totalAmount / 4);

        assertTrue(arbiter.resolvedDisputes(jobId));
    }

    function setupDisputedJob() internal returns (uint256) {
        vm.startPrank(client);
        uint256 jobId = escrow.createAJob(address(0), freelancer, 1 ether, block.timestamp + 1 days);
        vm.stopPrank();

        vm.prank(freelancer);
        escrow.signContract(jobId);

        vm.prank(client);
        escrow.payAndLockFunds{value: 1 ether}(jobId, 1 ether);

        vm.prank(client);
        escrow.openDispute(jobId);

        return jobId;
    }

    // add more extensive tests
}
