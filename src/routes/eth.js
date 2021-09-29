const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const instance = require('../../ethereum/factory')
const User = require('../models/user');
const proxy = require('express-http-proxy');
const proxyMiddleware = require('http-proxy-middleware')

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


// router.use('/pay', (req, res) => {
//     proxy('https://pos-api-dh.herokuapp.com', {
//     //The proxyRqDecorator allows us to change a few things including the request type.

// proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
//     proxyReqOpts.method = 'GET';
//     return proxyReqOpts;
// },

// //The proxyReqPathResolver takes the Given URL and updates it to the forward path
// proxyReqPathResolver: function (req) {
//     return new Promise( (resolve, reject) => {
//         setTimeout( () =>{
//             req.session.address = req.body.address
//             req.session.amount = req.body.amount
//             var value = req.body.key;

//             var resolvedPathValue = 'https://pos-api-dh.herokuapp.com/payment' + value;
//             console.log(`Inside forward path. The resolved path is ${resolvedPathValue}`);
//             resolve(resolvedPathValue);
//             //address = ' + req.session.address + 'amount = ' + req.session.amount
//         }, 200);
//     });
// }
// })
/* try {
    req.session.address = req.body.address
    req.session.amount = req.body.amount
    // console.log(address, amount)
    res.redirect(302,'/payment');
    // res.status(202).send({ address, amount })
    // res.render("payment.ejs", { address, amount })
} catch (e) {
    res.send(e)
} */
// })

/* var apiProxy = proxyMiddleware('/pay', {target: 'https://pos-api-dh.herokuapp.com/payment'});

router.use(apiProxy) */

//router.post('/pay', );

router.post('/pay', (req, res) => {
    res.send({
        html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
            integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
        <link rel="stylesheet" href="https://bootswatch.com/4/journal/bootstrap.min.css" />
        <title>Payment gateway</title>
    </head>
    <body>
        <div class="container">
            <p>req.body.address</p>
            <p>req.body.amount</p>
        </div>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
            integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
            crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
            integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"
            crossorigin="anonymous"></script>
    </body>
    </html>`})
})



router.use('/payment', (req, res) => {
    /*     req.session.address = req.body.address
        req.session.amount = req.body.amount */
    /* if (!req.session.address || !req.session.amount) {
        return res.status(400).send()
    } */
    res.render('payment.ejs', { address: req.session.address, amount: req.session.amount })
})


router.get("/fiat", auth, async (req, res) => {
    res.render("fiat");
})

module.exports = router;