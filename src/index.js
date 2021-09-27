const express = require('express')

const dotenv = require('dotenv');
const instance = require('../ethereum/factory')
const accountInstance = require('../ethereum/account')
const session = require('express-session')
const userRoute = require('./routes/users')
const ethRoute = require('./routes/eth')
const web3 = require('../ethereum/web3')
var path = require("path");
const cors = require('cors')



const app = express();
dotenv.config();

const mongoose = require('./database/mongoose')

app.use(express.json())
app.use(cors());
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }))
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false, limit: '20mb' }))



app.use(userRoute)
app.use(ethRoute)


app.get('/', (req, res) => {
    res.render("index.ejs");
})


app.listen(process.env.PORT, function () {
    console.log("This server port is 3000!! ");
})
