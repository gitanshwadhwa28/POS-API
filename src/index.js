const express = require('express')
const { instance } = require('../ethereum/factory')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('POS API')
})

app.get('/accounts', async (req, res) => {
    try {
        const accounts = await instance.methods.getDeployedAccounts().call()

        // if (accounts.length == 0) {
        //     res.status(404).send({ error: 'empty array' })
        // }
        res.status(202).send(accounts)

    } catch (e) {
        res.status(400).send(e)
    }
})

app.listen(port, () => {
    console.log('server up on port', port)
})