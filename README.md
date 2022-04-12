# Blockchain Real Estate Capstone Project

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

## Description

A project that implements Zokrates Proofs, Real Estate minting and a few extra tasty treats.

## Pertinent Contents
- [eth-contracts](eth-contracts/contracts)
  - ERC721Mintable.sol
  - RESolnSquareVerifier.sol
  - RESquareVerifier(renamed from square output)
- [test](Tests for contracts)
  - TestERC721Mintable.js
  - TestSolnSquareVerifier.js
  - TestSquareVerifier.js
- [app](gui to mint new tokens)
  - index.js(info for contract)


## Setup
1. Download repository
2. cd into eth-contracts folder
3. run npm install
4. verify info in truffle-config.js file to make sure mnemonic is set up correctly.
5. Run truffle compile to verify contract 
6. MAC Setup for Zokrates - run the following commands at the terminal
   1. Zokrates Setup and run
         docker run -v /Users/shaneN/WebstormProjects/capstone/zokrates/code:/home/zokrates/code -ti zokrates/zokrates /bin/bash 
   2. cd code/square 
   3. zokrates compile -i square.code 
   4. zokrates setup 
   5. zokrates compute-witness -a 3 9 
   6. zokrates generate-proof 
   7. zokrates export-verifier

## Deployed Info

* [Contract address link](https://rinkeby.etherscan.io/address/0xe29e09ff9cd516853624693e2089641bf80d03e0)
* [Contract link](https://rinkeby.etherscan.io/address/0xe29e09ff9cd516853624693e2089641bf80d03e0)
* [account contract deployed link](https://rinkeby.etherscan.io/address/0xad54c8b572dba40e11a0f55ecac69e6f0bbf1040)
* [Opensea forsale](https://testnets.opensea.io/0xAD54C8B572dBa40e11a0F55eCAc69e6F0BbF1040)

## Issues
1. Opensea's testnet wouldn't allow me to connect with my rinkeby Metamask wallet, I tried 10 different times, on 2 different computers, it keeps giving me an Opensea error and won't connect.  [Link](./issues/OpenseaError.png).  I could not complete the last step to purchase the 5 minted tokens with another address.


# Project Resources

* [WebStorm](https://www.jetbrains.com/webstorm/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

## Credits
* [Udacity](https://github.com/udacity/Blockchain-Capstone)
