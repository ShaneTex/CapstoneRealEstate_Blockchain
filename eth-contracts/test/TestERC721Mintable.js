var ERC721MintableComplete = artifacts.require('RealEstateERC721Token');

contract('TestERC721Mintable', accounts => {

    const owner = accounts[0];
    const account_one = accounts[1];
    const account_two = accounts[2];
    const account_three = accounts[3];
    const account_four = accounts[4];
    const account_five = accounts[5];

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new("Token Real Estate",
                "TRE", {from: owner});

            // TODO: mint multiple tokens
            //let starPrice = web3.utils.toWei(".01", "ether");
            //const realEstateMintable = await contract.deployed();
            let results1 = await this.contract.mint(account_one, 1, {from: owner});
            let results2 = await this.contract.mint(account_two, 2, {from: owner});
            let results3 = await this.contract.mint(account_three, 3, {from: owner});
            let results4 = await this.contract.mint(account_three, 4, {from: owner});
        })

        it('should return total supply', async function () {
            let totalSupply = await this.contract.totalSupply();
            //console.log("totalSupply ==============")

            assert.equal(parseInt(totalSupply), 4, 'Error: There should be 4 minted tokens');
        })

        it('should get token balance', async function () {
            let ownerOneBalance = await this.contract.balanceOf(account_one);
            assert.equal(parseInt(ownerOneBalance), 1, 'Error: There should be 1 minted tokens for user one');

            let ownerTwoBalance = await this.contract.balanceOf(account_two);
            assert.equal(parseInt(ownerTwoBalance), 1, 'Error: There should be 1 minted tokens for user two');

            let ownerThreeBalance = await this.contract.balanceOf(account_three);
            assert.equal(parseInt(ownerThreeBalance), 2, 'Error: There should be 2 minted tokens for user three');
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            const uriBase = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
            let tokenUrl1 = await this.contract.tokenURI(1);
            let tokenUrl2 = await this.contract.tokenURI(2);
            let tokenUrl3 = await this.contract.tokenURI(3);
            let tokenUrl4 = await this.contract.tokenURI(4);
            //console.log("totalSupply ==============")
            //console.log("totalSupply ==============", tokenUrl1)

            assert.equal(tokenUrl1, uriBase + "1", 'Error: Not correct URL');
            assert.equal(tokenUrl2, uriBase + "2", 'Error: Not correct URL');
            assert.equal(tokenUrl3, uriBase + "3", 'Error: Not correct URL');
            assert.equal(tokenUrl4, uriBase + "4", 'Error: Not correct URL');

        })

        it('should transfer token from one owner to another', async function () {

            let ownerFourBalanceBefore = await this.contract.balanceOf(account_four);
            assert.equal(parseInt(ownerFourBalanceBefore), 0, 'Error: Not correct, should have 0');

            await this.contract.approve(account_four, 2, {from: owner});
            await this.contract.transferFrom(account_two, account_four, 2, {from: account_two});

            let ownerFourBalance = await this.contract.balanceOf(account_four);
            assert.equal(parseInt(ownerFourBalance), 1, 'Error: Not correct, should have 1');
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new("Token Real Estate",
                "TRE", {from: account_one});

        })

        it('should fail when minting when address is not contract owner', async function () {
            let results6 = await this.contract.mint(account_one, 5, {from: account_two});
        })

        it('should return contract owner', async function () {
            let contractOwner = await this.contract.getOwner();
            //console.log("Contract Owner ==============");
            //console.log("", contractOwner);
            assert.equal(account_one, contractOwner, 'Error: Not expected Contract Owner');
        })

    });
})
