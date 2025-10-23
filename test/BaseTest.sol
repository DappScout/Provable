// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "forge-std/Test.sol";
import "../src/SEOEscrow.sol";
import "../src/SEOFinance.sol";
import "../src/SEOArbiter.sol";
import "../src/SEORegistry.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
    constructor() ERC20("Mock", "MCK") {
        _mint(msg.sender, 1000000 * 10 ** 18);
    }
}

contract BaseTest is Test {
    SEOEscrow escrow;
    SEOFinance finance;
    SEOArbiter arbiter;
    SEORegistry registry;
    MockERC20 token;

    address client;
    address freelancer;
    address arbiterUser;
    address feeCollector;

    function setUp() public virtual {
        // Setup accounts
        client = makeAddr("client");
        freelancer = makeAddr("freelancer");
        arbiterUser = makeAddr("arbiter");
        feeCollector = makeAddr("feeCollector");

        // Deploy contracts
        token = new MockERC20();
        finance = new SEOFinance(feeCollector);
        registry = new SEORegistry(address(token));
        arbiter = new SEOArbiter();
        escrow = new SEOEscrow(payable(address(finance)), address(arbiter), address(registry));

        // Configure contracts
        finance.setEscrow(escrow);
        arbiter.setEscrow(escrow);
        registry.allowToken(address(token), "MCK", 18);
        vm.deal(client, 100 ether);
        token.transfer(client, 10000 * 10 ** 18);
    }
}
