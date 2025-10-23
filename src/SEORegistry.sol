// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SEORegistry {
    mapping(address => bool) public allowedTokens;

    struct TokenInfo {
        string symbol;
        uint8 decimals;
        bool active;
    }

    mapping(address => TokenInfo) public tokenInfo;
    address public owner;

    event TokenListed(address indexed token, string symbol);
    event TokenUnlisted(address indexed token);
    event BasePriceUpdated(uint256 newPrice);

    constructor(address _baseToken) {
        owner = msg.sender;
        allowedTokens[_baseToken] = true;
        tokenInfo[_baseToken] = TokenInfo("BASE", 18, true);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function allowToken(address token, string calldata symbol, uint8 decimals) external onlyOwner {
        allowedTokens[token] = true;
        tokenInfo[token] = TokenInfo(symbol, decimals, true);
        emit TokenListed(token, symbol);
    }

    function disallowToken(address token) external onlyOwner {
        allowedTokens[token] = false;
        tokenInfo[token].active = false;
        emit TokenUnlisted(token);
    }

    function isAllowed(address token) external view returns (bool) {
        return allowedTokens[token];
    }
}
