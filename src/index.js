const express = require('express')
const dotenv = require('dotenv');
const { instance } = require('../ethereum/factory')
const mongoose = require('mongoose');

const app = express()

app.use(express.json())

dotenv.config();

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

app.use("/", require("./routes"));

/* mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (client, err) =>{
        try{

            console.log("Connected to db")
        }catch(err){
            console.log(err);
        }

    }
); */

app.listen(process.env.PORT, function(){
    console.log("This server port is 3000!! ");
})
