
let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
    console.log("metamask connected")
} else {
    const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/33a046f29f2d4dbf966f5e2a548e57"
    );
    web3 = new Web3(provider);
    console.log("metamask not connected")
}

var factory = JSON.parse('{\"abi\":[{\"inputs\":[],\"name\":\"createAccount\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"deployedAccounts\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getDeployedAccounts\",\"outputs\":[{\"internalType\":\"address[]\",\"name\":\"\",\"type\":\"address[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]}');
console.log(factory.abi)
let contract;

function myFunction2() {
    contract = new web3.eth.Contract(
        factory.abi,
        '0xC7Cd8F16D7ff47586045187Eb02038F14d3853cD'
    )
    console.log(contract)
}

myFunction2()

let account;

web3.eth.getAccounts(function (err, accounts) {
    if (err != null) {
        alert("Error retrieving accounts.");
        return;
    }
    if (accounts.length == 0) {
        alert("No account found");
        return;
    }
    account = accounts[0];
    console.log(account)
    web3.eth.defaultAccount = account;
});



function myFunction() {
    contract.methods.createAccount().send({ from: account }).then(function (tx) {
        console.log("Transaction: ", tx);
    });
}
