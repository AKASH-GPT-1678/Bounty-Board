// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {BountyV1} from "../src/BountyV1.sol";

contract DeployBounty is Script {
    function run() external {
        // Load private key and start broadcast
        vm.startBroadcast();


        // Deploy the BountyV1 contract with the token address
        BountyV1 bounty = new BountyV1();

        vm.stopBroadcast();
    }
}
