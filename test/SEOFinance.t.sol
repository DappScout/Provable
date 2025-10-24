// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "./BaseTest.sol";

contract SEOFinanceTest is BaseTest {
    function setUp() public override {
        super.setUp();
    }

    function test_ETHFeeCollection() public {
        uint256 budget = 1 ether;
        uint256 deadline = block.timestamp + 1 days;

        // Create job
        vm.startPrank(client);
        uint256 jobId = escrow.createAJob(address(0), freelancer, budget, deadline);
        vm.stopPrank();

        vm.prank(freelancer);
        escrow.signContract(jobId);

        vm.prank(client);
        escrow.payAndLockFunds{value: budget}(jobId, budget);

        uint256 expectedFee = (budget * constants.PLATFORM_FEE_BPS()) / 10000;
        assertEq(finance.feeAmountETH(), expectedFee);

        uint256 feeCollectorBalanceBefore = feeCollector.balance;
        vm.prank(feeCollector);
        finance.claimFees(address(0));
        assertEq(feeCollector.balance - feeCollectorBalanceBefore, expectedFee);
    }

    function test_ERC20FeeCollection() public {
        uint256 budget = 1000 * 10 ** 18;
        uint256 deadline = block.timestamp + 1 days;

        // Create job
        vm.startPrank(client);
        uint256 jobId = escrow.createAJob(address(token), freelancer, budget, deadline);
        vm.stopPrank();

        vm.prank(freelancer);
        escrow.signContract(jobId);

        vm.startPrank(client);
        token.approve(address(escrow), budget);
        escrow.payAndLockFunds(jobId, budget);
        vm.stopPrank();

        uint256 expectedFee = (budget * constants.PLATFORM_FEE_BPS()) / 10000;
        assertEq(finance.feeAmountERC20(address(token)), expectedFee);

        uint256 feeCollectorBalanceBefore = token.balanceOf(feeCollector);
        vm.prank(feeCollector);
        finance.claimFees(address(token));
        assertEq(token.balanceOf(feeCollector) - feeCollectorBalanceBefore, expectedFee);
    }

    function test_NonFeeCollectorClaimFees() public {
        vm.prank(makeAddr("notFeeCollector"));
        vm.expectRevert();
        finance.claimFees(address(0));
    }

    function testSetFeeCollector() public {
        address newFeeCollector = makeAddr("newFeeCollector");
        vm.prank(finance.owner());
        finance.setFeeCollector(newFeeCollector);
        assertEq(finance.feeCollector(), newFeeCollector);
    }
    
}
