const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const instance = require('../../ethereum/factory')
const User = require('../models/user');

router.get('/accounts', auth, async (req, res) => {
    try {
        const accounts = await instance.methods.getDeployedAccounts().call()

        if (accounts.length == 0) {
            res.status(404).send({ error: 'empty array' })
        }
        res.status(202).send(accounts)

    } catch (e) {
        res.redirect("/admin");
    }
})

router.get('/payment/:id/:amount', auth, async (req, res) => {
    try {
        const id = req.params.id
        const amount = req.params.amount
        res.render("payment.ejs", { id, amount })
    } catch (e) {
        res.send(e)
    }
})

router.post('/addContract', auth, async (req, res) => {
    try {
        const address = await req.user.addAddress(req.body.address)
        res.status(200).send(address)
    } catch (e) {
        res.redirect("/admin");
    }
})

router.get('/contracts', auth, async (req, res) => {
    try {
        const userContracts = await User.findById(req.user._id)
        const contracts = userContracts.contracts
        console.log(contracts)
        res.render("admin/contracts.ejs", { contracts, user: req.user })
    } catch (e) {
        res.redirect("/admin");
    }
})

router.get('/details/:address', auth, async (req, res) => {
    res.render("admin/contractDetails.ejs", { address: req.params.address, user: req.user })
})

router.get('/pay', async (req, res) => {
    try {
        const address = req.body.address
        const amount = req.body.amount
        console.log(address, amount)
        res.render("payment.ejs", { address, amount })
    } catch (e) {
        res.send(e)
    }
})


router.get("/fiat", auth, async (req, res) => {
    res.render("fiat");
})

module.exports = router;