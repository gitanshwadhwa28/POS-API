const express = require('express')

const dotenv = require('dotenv');
const instance = require('../ethereum/factory')
const accountInstance = require('../ethereum/account')
// const mongoose = require('./db/mongoose')
const userRoute = require('./routes/users')
const web3 = require('../ethereum/web3')
// const Web3 = require('web3')

const { join } = require('path')

const app = express()

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(join(__dirname, "./public")));

app.use(express.json())
app.use(userRoute)

dotenv.config();

app.get('/', (req, res) => {
    res.render("index.ejs");
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
        const accounts = await web3.eth.requestAccounts()
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
