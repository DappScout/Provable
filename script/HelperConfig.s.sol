// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";

/**
 * @title CodeConstants
 * @notice Contains chain IDs and deployment constants
 */
abstract contract CodeConstants {
    // Chain IDs
    uint256 public constant BASE_SEPOLIA_CHAIN_ID = 84532;
    uint256 public constant LOCAL_CHAIN_ID = 31337;

    // Base Sepolia addresses
    address public constant BASE_SEPOLIA_LINK = 0xE4aB69C077896252FAFBD49EFD26B5D171A32410;

    // Mock values for local testing
    uint96 public constant MOCK_LINK_BALANCE = 100 ether;
}

/**
 * @title HelperConfig
 * @notice Manages network-specific configurations for SEO Escrow deployment
 * @dev Follows the pattern from Example/scripts/HelperConfig.s.sol
 */
contract HelperConfig is Script, CodeConstants {

    error HelperConfig__InvalidChainId();

    /**
     * @dev Network configuration struct
     * @param feeCollector Address that receives platform fees
     * @param baseToken Base token for registry (address(0) for ETH)
     * @param linkToken LINK token address for Chainlink Automation
     * @param account Deployer account (for local testing)
     */
    struct NetworkConfig {
        address feeCollector;
        address baseToken;
        address linkToken;
        address account;
    }

    // Storage for local network config
    NetworkConfig public localNetworkConfig;

    // Mapping of chainId to network config
    mapping(uint256 chainId => NetworkConfig) public networkConfigs;

    /**
     * @dev Constructor initializes network configurations
     */
    constructor() {
        networkConfigs[BASE_SEPOLIA_CHAIN_ID] = getBaseSepoliaConfig();
    }

    /**
     * @notice Get configuration for current chain
     * @return NetworkConfig for the current blockchain
     */
    function getConfig() public returns (NetworkConfig memory) {
        return getConfigByChainId(block.chainid);
    }

    /**
     * @notice Get configuration by specific chain ID
     * @param chainId The chain ID to get config for
     * @return NetworkConfig for the specified chain
     */
    function getConfigByChainId(uint256 chainId) public returns (NetworkConfig memory) {
        if (networkConfigs[chainId].linkToken != address(0)) {
            return networkConfigs[chainId];
        } else if (chainId == LOCAL_CHAIN_ID) {
            return getOrCreateAnvilConfig();
        } else {
            revert HelperConfig__InvalidChainId();
        }
    }

    /**
     * @notice Get Base Sepolia testnet configuration
     * @return NetworkConfig for Base Sepolia
     */
    function getBaseSepoliaConfig() public view returns (NetworkConfig memory) {
        return NetworkConfig({
            feeCollector: msg.sender, // Deployer is fee collector by default
            baseToken: address(0), // ETH as base token
            linkToken: BASE_SEPOLIA_LINK,
            account: msg.sender
        });
    }

    /**
     * @notice Get or create Anvil local configuration
     * @return NetworkConfig for local Anvil chain
     */
    function getOrCreateAnvilConfig() public returns (NetworkConfig memory) {
        // Return cached config if already created
        if (localNetworkConfig.account != address(0)) {
            return localNetworkConfig;
        }

        console.log("Deploying mocks for local Anvil chain...");

        vm.startBroadcast();

        // Deploy mock LINK token for local testing
        MockLinkToken linkToken = new MockLinkToken();

        vm.stopBroadcast();

        // Cache the config
        localNetworkConfig = NetworkConfig({
            feeCollector: msg.sender,
            baseToken: address(0), // ETH
            linkToken: address(linkToken),
            account: msg.sender
        });

        console.log("Mock LINK token deployed at:", address(linkToken));

        return localNetworkConfig;
    }
}

/**
 * @title MockLinkToken
 * @notice Simple mock LINK token for local testing
 */
contract MockLinkToken {
    string public constant name = "ChainLink Token";
    string public constant symbol = "LINK";
    uint8 public constant decimals = 18;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor() {
        // Mint initial supply to deployer
        balanceOf[msg.sender] = 1000000 * 10 ** decimals;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }
}
