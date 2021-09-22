const Web3 = require('web3')

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
} else {
    const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/33a046f29f2d4dbf966f5e2a548e576c"
    );
    web3 = new Web3(provider);
}

module.exports = web3