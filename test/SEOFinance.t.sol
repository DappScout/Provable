// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "./BaseTest.sol";

contract SEOFinanceTest is BaseTest {
    function setUp() public override {
        super.setUp();
    }

    // function test_DepositAndReleaseETH() public {
    //     uint256 amount = 1 ether;
    //     uint256 jobId = 1;

    //     vm.deal(address(this), amount);
    //     finance.depositETH{value: amount}(jobId);
        
    //     assertEq(finance.balanceOf(jobId, address(0)), amount);
        
    //     address payable recipient = payable(makeAddr("recipient"));
    //     finance.releaseETH(jobId, recipient, amount);
        
    //     assertEq(recipient.balance, amount);
    //     assertEq(finance.balanceOf(jobId, address(0)), 0);
    // }

    // function test_DepositAndReleaseERC20() public {
    //     uint256 amount = 1000 * 10**18;
    //     uint256 jobId = 1;

    //     token.approve(address(finance), amount);
    //     token.transfer(address(this), amount);
        
    //     finance.depositERC20(jobId, address(token), amount);
    //     assertEq(finance.balanceOf(jobId, address(token)), amount);
        
    //     address recipient = makeAddr("recipient");
    //     finance.releaseERC20(jobId, address(token), recipient, amount);
        
    //     assertEq(token.balanceOf(recipient), amount);
    //     assertEq(finance.balanceOf(jobId, address(token)), 0);
    // }

    // add more extensive tests
}
