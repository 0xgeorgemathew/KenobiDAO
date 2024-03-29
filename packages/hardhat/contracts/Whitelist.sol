//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Hitlist {
    // Event for when max whitelisted addresses is changed
    event MaxWhitelistedAddressesChanged(uint8 newMaxWhitelistedAddresses);
    // Event for when address is added to whitelist
    event AddedToWhitelist(address newWhitelistedAddress);
    // Max number of whitelisted addresses allowed
    uint8 public maxWhitelistedAddresses;
    address public owner;
    // Create a mapping of whitelistedAddresses
    // if an address is whitelisted, we would set it to true, it is false my default for all other addresses.
    mapping(address => bool) public whitelistedAddresses;

    // numAddressesWhitelisted would be used to keep track of how many addresses have been whitelisted
    uint8 public numAddressesWhitelisted;

    constructor(uint8 _maxWhitelistedAddresses) {
        maxWhitelistedAddresses = _maxWhitelistedAddresses;
        owner = msg.sender;
    }

    /**
        addAddressToWhitelist - This function adds the address of the sender to the
        whitelist
     */
    function addAddressToWhitelist() public {
        // check if the user has already been whitelisted
        require(
            !whitelistedAddresses[msg.sender],
            "Sender has already been whitelisted"
        );
        // check if the numAddressesWhitelisted < maxWhitelistedAddresses, if not then throw an error.
        require(
            numAddressesWhitelisted < maxWhitelistedAddresses,
            "More addresses cant be added, limit reached"
        );
        // Add the address which called the function to the whitelistedAddress array
        whitelistedAddresses[msg.sender] = true;
        // Increase the number of whitelisted addresses
        numAddressesWhitelisted += 1;
        emit AddedToWhitelist(msg.sender);
    }

    // fucntion to set the max number of addresses that can be whitelisted
    function setMaxWhitelistedAddresses(uint8 _maxWhitelistedAddresses) public {
        maxWhitelistedAddresses = _maxWhitelistedAddresses;
        emit MaxWhitelistedAddressesChanged(maxWhitelistedAddresses);
    }
}
