// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "./BaseTest.sol";

contract SEORegistryTest is BaseTest {
    function setUp() public override {
        super.setUp();
    }

    function test_AllowToken() public {
        address newToken = makeAddr("newToken");

        vm.prank(registry.owner());
        registry.allowToken(newToken, "TEST", 18);

        assertTrue(registry.isAllowed(newToken));

        (string memory symbol, uint8 decimals, bool active) = registry.tokenInfo(newToken);
        assertEq(symbol, "TEST");
        assertEq(decimals, 18);
        assertTrue(active);
    }

    function test_DisallowToken() public {
        address newToken = makeAddr("newToken");

        vm.startPrank(registry.owner());
        registry.allowToken(newToken, "TEST", 18);
        registry.disallowToken(newToken);
        vm.stopPrank();

        assertFalse(registry.isAllowed(newToken));
        (,, bool active) = registry.tokenInfo(newToken);
        assertFalse(active);
    }

    function test_NonOwnerAllowToken() public {
        vm.prank(makeAddr("notOwner"));
        vm.expectRevert();
        registry.allowToken(address(0x1), "TEST", 18);
    }

    // add more extensive tests
}
