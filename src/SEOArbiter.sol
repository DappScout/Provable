// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {SEOEscrow} from "./SEOEscrow.sol";

/// @title SEOArbiter - Handles dispute resolution for SEO Escrow jobs
/// @notice Allows designated arbiters to settle disputes between clients and freelancers
contract SEOArbiter {
    SEOEscrow public escrow;
    address public owner;

    mapping(uint256 => bool) public resolvedDisputes;
    mapping(address => bool) public isArbiter;

    event ArbiterAdded(address indexed arbiter);
    event ArbiterRemoved(address indexed arbiter);

    constructor(address _escrow) {
        escrow = SEOEscrow(_escrow);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyArbiter() {
        require(isArbiter[msg.sender], "Not arbiter");
        _;
    }

    function addArbiter(address _arbiter) external onlyOwner {
        isArbiter[_arbiter] = true;
        emit ArbiterAdded(_arbiter);
    }

    function removeArbiter(address _arbiter) external onlyOwner {
        isArbiter[_arbiter] = false;
        emit ArbiterRemoved(_arbiter);
    }

    function resolveDispute(uint256 jobId, uint256 clientAmount, uint256 freelancerAmount) external onlyArbiter {
        require(!resolvedDisputes[jobId], "Already resolved");

        escrow.resolveDispute(jobId, clientAmount, freelancerAmount);

        resolvedDisputes[jobId] = true;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid owner");
        owner = newOwner;
    }
}
