
let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
} else {
    const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/33a046f29f2d4dbf966f5e2a548e57"
    );
    web3 = new Web3(provider);
}

var factory = JSON.parse('{\"abi\":[{\"inputs\":[],\"name\":\"createAccount\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"deployedAccounts\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getDeployedAccounts\",\"outputs\":[{\"internalType\":\"address[]\",\"name\":\"\",\"type\":\"address[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]}');

const contract = new web3.eth.Contract(
    factory.abi,
    '0xC7Cd8F16D7ff47586045187Eb02038F14d3853cD'
)

const result = document.getElementById("result")

async function myFunction() {
    try {
        result.innerHTML = "Processing Request..."
        const accounts = await web3.eth.requestAccounts()
        const res = await contract.methods.createAccount().send({ from: accounts[0] })
        result.innerHTML = "Contract Deployed Successfully!"
    } catch (e) {
        result.innerHTML = e.message
    }
}
