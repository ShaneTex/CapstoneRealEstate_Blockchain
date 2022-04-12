// migrating the appropriate contracts
var RESquareVerifier = artifacts.require("./RESquareVerifier.sol");
var RESolnSquareVerifier = artifacts.require("./RESolnSquareVerifier.sol");

module.exports = function(deployer) {
  deployer.deploy(RESquareVerifier)
      .then(() => {
        return deployer.deploy(RESolnSquareVerifier, RESquareVerifier.address, "Token Real Estate", "TRE");
      });
  //deployer.deploy(SolnSquareVerifier);
};
