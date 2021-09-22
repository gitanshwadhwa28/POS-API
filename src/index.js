const express = require('express')

const dotenv = require('dotenv');
const instance = require('../ethereum/factory')
const mongoose = require('./db/mongoose')
const userRoute = require('./routes/users')

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

app.listen(process.env.PORT, function () {
    console.log("This server port is 3000!! ");
})
