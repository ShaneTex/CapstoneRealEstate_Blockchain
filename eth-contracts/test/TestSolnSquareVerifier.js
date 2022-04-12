// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
var SquareVerifier = artifacts.require('SquareVerifier');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

contract('Solution TestVerifier', accounts => {

    const owner = accounts[0];
    const account_one = accounts[1];
    const account_two = accounts[2];
    const account_three = accounts[3];
    const account_four = accounts[4];
    const account_five = accounts[5];

    const token = 1;
    const token2 = 2;

    const proofValid = {
        "proof": {
            "a": [
                "0x0cbea0270b8ce9a286d97ac73f9a5268e580c5d52712e30f8c6447e52e77d5bf",
                "0x1fec2ca036d1b392597e9608339b725811ee9d568d408dca59cb6eb267d2f460"
            ],
            "b": [
                [
                    "0x0c6635d360e086b7a2ea23879856bd8fc54c454325e5b6da336709fdcea742c1",
                    "0x2d099bad2b16feca539547f2a7cdc063995ce39abe429b5877768f58a680e0ea"
                ],
                [
                    "0x0b45f864a6a8868ecd8fe79403b8b21dc4a72cea76c30d87ed24368a7842e703",
                    "0x2a9bf8c191eb0196bfb08af2127873035924b8c0f28224808eef6c30d5b8d35d"
                ]
            ],
            "c": [
                "0x178c2e0ef60a17a0f4493b766ea1d83dc9b513438448948af13fb46fa188b88f",
                "0x046341a56ce4409877da7b2a18d7cc790689d710c6287f0355909bf6ea52201f"
            ]
        },
        "inputs": [
            "0x0000000000000000000000000000000000000000000000000000000000000009",
            "0x0000000000000000000000000000000000000000000000000000000000000001"
        ]
    }


    describe('Solution Mint Testing', function () {
        beforeEach(async function () {
            this.verifier = await SquareVerifier.new();

            this.contract = await SolnSquareVerifier.new(this.verifier.address,
                "Token Real Estate", "TRE", {from: owner});

        })

        it('test new solutions added to contract', async function () {
            let solution = await this.contract.addSolution(
                token,
                proofValid.proof,
                proofValid.inputs,
                {from: owner});
            //console.log("Solutions is Verified", solution);
            assert.equal(solution.receipt.status, true, 'Error: this should be true');
        })

        it('test if ERC721 can be minted for contract', async function () {

            let ownerOneBalanceBefore = await this.contract.balanceOf(account_one);

            // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
            //let results1 = await this.contract.mint(account_one, 1, {from: owner});
            let verifyAndMint = await this.contract.verifyAndMint(
                account_one,
                token,
                proofValid.proof,
                proofValid.inputs,
                {from: owner});

            let verifyAndMint2 = await this.contract.verifyAndMint(
                account_one,
                token2,
                proofValid.proof,
                proofValid.inputs,
                {from: owner});

            let verifyAndMint3 = await this.contract.verifyAndMint(
                account_three,
                3,
                proofValid.proof,
                proofValid.inputs,
                {from: owner});

            let ownerOneBalanceAfter = await this.contract.balanceOf(account_one);
            assert.equal(ownerOneBalanceAfter, 2, 'Error: Not correct, should have 1');
        })
    });
})
