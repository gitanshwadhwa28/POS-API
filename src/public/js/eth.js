const web3 = require('../../../ethereum/web3')

function init() {
    console.log("hah")
    var btn = document.getElementById("btn");
    btn.addEventListener("click", async () => {
        document.getElementById('demo').innerHTML = Date()
        const accounts = await web3.eth.getAccounts()
        await factory.methods.createCampaign(this.state.minimum).send({ from: accounts[0] })
    });
}
window.onload = init;