const express = require('express')

const dotenv = require('dotenv');
const instance = require('../ethereum/factory')
const accountInstance = require('../ethereum/account')
// const mongoose = require('./db/mongoose')
const userRoute = require('./routes/users')
const web3 = require('../ethereum/web3')
const { forwardAuthenticated, ensureAuthenticated } = require('./config/auth');


const { join } = require('path')

const app = express()

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + '/public'));

app.use(express.json())
app.use(userRoute)

dotenv.config();

app.get('/', ensureAuthenticated, (req, res) => {
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

app.get('/payment/:id/:amount', async (req, res) => {
    try {
        const id = req.params.id
        const amount = req.params.amount
        res.render("payment.ejs", { id, amount })
    } catch (e) {
        res.send(e)
    }
})


app.listen(process.env.PORT, function () {
    console.log("This server port is 3000!! ");
})
