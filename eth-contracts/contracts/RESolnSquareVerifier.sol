pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./ERC721Mintable.sol";
// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./RESquareVerifier.sol";

contract RESquareVerifier is Verifier {}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract RESolnSquareVerifier is RealEstateERC721Token {

    RESquareVerifier private verifierContract;

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address addr;
        bytes32 hash;
    }

// TODO define an array of the above struct
    Solution[] solutions;

// TODO define a mapping to store unique solutions submitted
    mapping (bytes32 => Solution) submittedSolution;


// TODO Create an event to emit when a solution is added
    event Added(uint256 tokenId);


    constructor(address verifierAddress,
        string memory name,
        string memory symbol) RealEstateERC721Token(name, symbol) public
    {
        verifierContract = RESquareVerifier(verifierAddress);
    }

// TODO Create a function to add the solutions to the array and emit the event
    // Define a function to check for proof and if verified set mapping
    function addSolution(uint256 tokenId, Verifier.Proof memory proof, uint[2] memory input) public returns (bool)
    {

        bool solutionIsVerified = verifierContract.verifyTx(proof, input);

        require(solutionIsVerified, "Solution could not be verified");

        bytes32 hashedProof = keccak256(abi.encodePacked(tokenId, proof.a.X, proof.a.Y,
            proof.b.X, proof.b.Y, proof.c.X, proof.c.Y, input));

        //Set new item to items mapping
        Solution memory newSolution = Solution(tokenId, msg.sender, hashedProof);
        submittedSolution[hashedProof] = newSolution;

        // Emit the appropriate event
        emit Added(tokenId);

        // return bool if it is verified
        return solutionIsVerified;
    }


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
    function verifyAndMint(address solutionAddress, uint256 tokenId, Verifier.Proof memory proof, uint[2] memory input) public
    {
        //Build hash to verify if unique
        bytes32 hashedProofForLookup = keccak256(abi.encodePacked(tokenId, proof.a.X, proof.a.Y,
            proof.b.X, proof.b.Y, proof.c.X, proof.c.Y, input));

        //Make sure solution is unique
        Solution memory existingSolution = submittedSolution[hashedProofForLookup];
        require(existingSolution.index == 0, "Index already exist");// != address[0]);


        //Add solution to contract
        addSolution(tokenId, proof, input);

        mint(solutionAddress, tokenId);
    }

}

























