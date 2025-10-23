// SPDX-License-Identifier: MIT

pragma solidity 0.8.30;

///@title Contract with constants
///@notice Contract that keep all the constants variables

contract Constants {
    uint256 internal constant MAX_JOBS_PER_CLIENT = 5;
    uint256 public constant PLATFORM_FEE_BPS = 250;
    uint256 public constant BPS_DENOMINATOR = 10000;
}
