// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract BountyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("BountyToken", "BT") {
        _mint(msg.sender, initialSupply);
    }
}
