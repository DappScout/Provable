// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./SEOEscrow.sol";

/**
 * @title SEOFinance
 * @notice Handles all token/ETH custody & release logic for the SEO-Escrow system.
 */
contract SEOFinance is ReentrancyGuard {
    using SafeERC20 for IERC20;

    SEOEscrow public escrow;
    address public owner;

    mapping(uint256 => mapping(address => uint256)) private _balances;

    event EscrowSet(address indexed escrow);
    event ERC20Deposited(uint256 indexed jobId, address indexed token, uint256 amount);
    event ETHDeposited(uint256 indexed jobId, uint256 amount);
    event ERC20Released(uint256 indexed jobId, address indexed token, address indexed to, uint256 amount);
    event ETHReleased(uint256 indexed jobId, address indexed to, uint256 amount);
    event ERC20Refunded(uint256 indexed jobId, address indexed token, address indexed to, uint256 amount);
    event ETHRefunded(uint256 indexed jobId, address indexed to, uint256 amount);

    modifier onlyEscrow() {
        require(msg.sender == address(escrow), "SEOFinance: caller is not escrow");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(SEOEscrow _escrow) {
        if (address(_escrow) != address(0)) {
            escrow = _escrow;
            owner = msg.sender;
            emit EscrowSet(address(_escrow));
        }
    }

    /// @notice Owner can set or update the escrow contract address
    function setEscrow(SEOEscrow _escrow) external onlyOwner {
        require(address(_escrow) != address(0), "SEOFinance: zero escrow");
        escrow = _escrow;
        emit EscrowSet(address(_escrow));
    }

    function depositERC20(uint256 jobId, address token, uint256 amount) external nonReentrant onlyEscrow {
        require(amount > 0, "SEOFinance: zero amount");
        require(token != address(0), "SEOFinance: token must be ERC20");

        _balances[jobId][token] += amount;
        emit ERC20Deposited(jobId, token, amount);
    }

    function depositETH(uint256 jobId) external payable nonReentrant onlyEscrow {
        require(msg.value > 0, "SEOFinance: zero ETH");
        _balances[jobId][address(0)] += msg.value;
        emit ETHDeposited(jobId, msg.value);
    }

    function releaseERC20(uint256 jobId, address token, address to, uint256 amount) external nonReentrant onlyEscrow {
        require(amount > 0, "SEOFinance: zero amount");
        require(token != address(0), "SEOFinance: token must be ERC20");
        require(_balances[jobId][token] >= amount, "SEOFinance: insufficient balance");
        require(to != address(0), "SEOFinance: zero recipient");

        _balances[jobId][token] -= amount;
        IERC20(token).safeTransfer(to, amount);

        emit ERC20Released(jobId, token, to, amount);
    }

    function releaseETH(uint256 jobId, address payable to, uint256 amount) external nonReentrant onlyEscrow {
        require(amount > 0, "SEOFinance: zero amount");
        require(_balances[jobId][address(0)] >= amount, "SEOFinance: insufficient ETH balance");
        require(to != payable(address(0)), "SEOFinance: zero recipient");

        _balances[jobId][address(0)] -= amount;
        (bool ok,) = to.call{value: amount}("");
        require(ok, "SEOFinance: ETH transfer failed");

        emit ETHReleased(jobId, to, amount);
    }

    function balanceOf(uint256 jobId, address token) external view returns (uint256) {
        return _balances[jobId][token];
    }

    function sweepERC20(address token, address to) external onlyOwner {
        require(token != address(0), "SEOFinance: token zero");
        uint256 total = IERC20(token).balanceOf(address(this));

        IERC20(token).safeTransfer(to, total);
    }

    function sweepETH(address payable to) external onlyOwner {
        uint256 balance = address(this).balance;
        (bool ok,) = to.call{value: balance}("");
        require(ok, "SEOFinance: sweep ETH failed");
    }

    receive() external payable {}
}
