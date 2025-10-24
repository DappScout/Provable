// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {SEORegistry} from "../src/SEORegistry.sol";
import {SEOArbiter} from "../src/SEOArbiter.sol";
import {SEOFinance} from "../src/SEOFinance.sol";
import {SEOEscrow} from "../src/SEOEscrow.sol";

/**
 * @title DeploySEO
 * @notice Main deployment script for SEO Escrow system
 * @dev Deploys all contracts in correct order and wires them together
 * @dev Follows the pattern from Example/scripts/DeployAirdrop.s.sol
 */
contract DeploySEO is Script {

    /**
     * @notice Struct to hold all deployed contract addresses
     * @dev Makes it easy to return and save deployment info
     */
    struct Deployment {
        SEORegistry registry;
        SEOArbiter arbiter;
        SEOFinance finance;
        SEOEscrow escrow;
        HelperConfig helperConfig;
    }

    /**
     * @notice Main entry point for deployment
     * @dev Called by `forge script`
     */
    function run() external returns (Deployment memory) {
        return deploySEOSystem();
    }

    /**
     * @notice Deploy complete SEO Escrow system
     * @return Deployment struct with all deployed contracts
     */
    function deploySEOSystem() public returns (Deployment memory) {

        // Get network configuration
        HelperConfig helperConfig = new HelperConfig();
        HelperConfig.NetworkConfig memory config = helperConfig.getConfig();

        console.log("\n==================================================");
        console.log("DEPLOYING SEO ESCROW SYSTEM");
        console.log("==================================================");
        console.log("Chain ID:", block.chainid);
        console.log("Deployer:", config.account);
        console.log("Fee Collector:", config.feeCollector);
        console.log("==================================================\n");

        // Start broadcasting transactions
        vm.startBroadcast();

        // ============================================
        // STEP 1: Deploy SEORegistry
        // ============================================
        console.log("1/4 Deploying SEORegistry...");
        SEORegistry registry = new SEORegistry(config.baseToken);
        console.log("    Registry deployed at:", address(registry));

        // ============================================
        // STEP 2: Deploy SEOArbiter
        // ============================================
        console.log("\n2/4 Deploying SEOArbiter...");
        SEOArbiter arbiter = new SEOArbiter();
        console.log("    Arbiter deployed at:", address(arbiter));

        // ============================================
        // STEP 3: Deploy SEOFinance
        // ============================================
        console.log("\n3/4 Deploying SEOFinance...");
        SEOFinance finance = new SEOFinance(config.feeCollector);
        console.log("    Finance deployed at:", address(finance));

        // ============================================
        // STEP 4: Deploy SEOEscrow (Main Contract)
        // ============================================
        console.log("\n4/4 Deploying SEOEscrow...");
        SEOEscrow escrow = new SEOEscrow(
            payable(address(finance)),
            address(arbiter),
            address(registry)
        );
        console.log("    Escrow deployed at:", address(escrow));

        // ============================================
        // STEP 5: Wire Contracts Together
        // ============================================
        console.log("\n==================================================");
        console.log("CONNECTING CONTRACTS");
        console.log("==================================================");

        console.log("Setting Escrow reference in Finance...");
        finance.setEscrow(escrow);
        console.log("    [OK] Finance.setEscrow() complete");

        console.log("Setting Escrow reference in Arbiter...");
        arbiter.setEscrow(escrow);
        console.log("    [OK] Arbiter.setEscrow() complete");

        console.log("Adding deployer as initial arbiter...");
        arbiter.addArbiter(config.account);
        console.log("    [OK] Arbiter.addArbiter() complete");

        vm.stopBroadcast();

        // ============================================
        // DEPLOYMENT SUMMARY
        // ============================================
        console.log("\n==================================================");
        console.log("DEPLOYMENT COMPLETE!");
        console.log("==================================================");
        console.log("SEORegistry:   ", address(registry));
        console.log("SEOArbiter:    ", address(arbiter));
        console.log("SEOFinance:    ", address(finance));
        console.log("SEOEscrow:     ", address(escrow));
        console.log("==================================================");
        console.log("\nCONFIGURATION:");
        console.log("Fee Collector: ", config.feeCollector);
        console.log("Base Token:    ", config.baseToken);
        console.log("LINK Token:    ", config.linkToken);
        console.log("==================================================");
        console.log("\nNEXT STEPS:");
        console.log("1. Save the Escrow address:", address(escrow));
        console.log("2. Register Chainlink Automation upkeep");
        console.log("3. Target contract:", address(escrow));
        console.log("4. Gas limit: 500000");
        console.log("5. Fund with LINK tokens");
        console.log("==================================================\n");

        // Return deployment info
        return Deployment({
            registry: registry,
            arbiter: arbiter,
            finance: finance,
            escrow: escrow,
            helperConfig: helperConfig
        });
    }
}
