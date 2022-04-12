import Web3 from "web3";
import realEstateTokenArtifact from "../../eth-contracts/build/contracts/RESolnSquareVerifier.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;
    this.proofValid = {
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

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = realEstateTokenArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
          realEstateTokenArtifact.abi,
          deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      console.log('accounts:',accounts);
      this.account = accounts[0];
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },

  createToken: async function() {
    const { verifyAndMint } = this.meta.methods;
    const id = document.getElementById("tokenId").value;
    //console.log("account", this.account)
    await verifyAndMint(this.account, id, this.proofValid.proof, this.proofValid.inputs).send({from: this.account});

    //await createToken(name, id).send({from: this.account, value: 1, gasLimit: 6721975, gasPrice: 20000000000});
    App.setStatus("New Minted Token Owner is " + this.account + ".");
  },

  // Implement Task 4 Modify the front end of the DAPP
  lookUp: async function (){
    try {
      const { balanceOf } = this.meta.methods;
      const lookid = document.getElementById("lookid").value;
      let foundTokens = await balanceOf(lookid).call({from: this.account});
      //console.log("foundTokens", foundTokens)
      App.setStatus("Balance of address " + foundTokens + ".");

    } catch (err) {
      App.setStatus("Error on Lookup " + err + ".");
    }
  }

};

window.App = App;

window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),);
  }

  App.start();
});
