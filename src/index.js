const express = require('express')

const dotenv = require('dotenv');
const instance = require('../ethereum/factory')
const accountInstance = require('../ethereum/account')
const mongoose = require('mongoose')
const passport = require('passport');
const userRoute = require('./routes/users')
const web3 = require('../ethereum/web3')
var path = require("path");
const { forwardAuthenticated, ensureAuthenticated } = require('./config/auth');

require('./config/passport')(passport);

const { join } = require('path')

const app = express();
dotenv.config();

app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(passport.session());

app.use("/public", express.static(__dirname + '/public'));

app.use(userRoute)




mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (client, err) => {
        try {

            console.log("Connected to db: ")
        } catch (err) {
            console.log(err);
        }

    }
);

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
