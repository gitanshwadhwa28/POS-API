const express = require('express')

const dotenv = require('dotenv');
const instance = require('../ethereum/factory')
const accountInstance = require('../ethereum/account')
// const mongoose = require('./db/mongoose')
const userRoute = require('./routes/users')
// const web3 = require('../ethereum/web3')
const Web3 = require('web3')


const app = express()
app.use(express.json())
app.use(userRoute)

dotenv.config();

app.get('/', (req, res) => {
    res.send('POS API')
})

app.get('/accounts', async (req, res) => {
    try {
        const accounts = await instance.methods.getDeployedAccounts().call()

        if (accounts.length == 0) {
            res.status(404).send({ error: 'empty array' })
        }
        res.status(202).send(accounts)

    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/create', async (req, res) => {
    try {

        let web3;

        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            window.ethereum.request({ method: "eth_requestAccounts" });
            web3 = new Web3(window.ethereum);
            console.log("metamask connect")
        } else {
            const provider = new Web3.providers.HttpProvider(
                "https://rinkeby.infura.io/v3/33a046f29f2d4dbf966f5e2a548e576c"
            );
            web3 = new Web3(provider);
            console.log("metamask not connected")
        }

        const accounts = await web3.eth.getAccounts()
        res.status(202).send(accounts)
        // await instance.methods.createAccount().send({ from: accounts[0] })
        // res.send('Contract deployed')
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})



app.listen(process.env.PORT, function () {
    console.log("This server port is 3000!! ");
})
