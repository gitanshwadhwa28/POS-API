const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')

const User = require('../models/user');
let err;

router.get('/signup', function (req, res) {
    err = "";
    res.render("register", { err });
});

router.post('/signup', async (req, res) => {
    const { name, email, password, password2 } = req.body;

    console.log(req.body.name)

    if (!name || !email || !password || !password2) {
        err = 'Please enter all fields'
        return res.render("register", { err })
    }

    if (password != password2) {
        err = 'Passwords do not match'
        return res.render("register", { err })
    }

    if (password.length < 3) {
        err = 'Password must be at least 3 characters'
        return res.render("register", { err })
    }


    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        err = 'Email already exists'
        return res.render("register", { err })
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })

    try {
        const savedUser = await user.save();
        const token = await user.generateAuthToken()
        req.session.token = token;
        res.redirect("/admin");
    } catch (err) {
        res.render("register", { err })
    }
});

let e;

router.get('/signin', function (req, res) {
    e = ""
    res.render("login", { e });
});

router.post('/signin', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        req.session.token = token;
        res.redirect("/admin")
    } catch (e) {
        res.render("login", { e })
    }
})

router.get('/admin', auth, async function (req, res) {
    const userContracts = await User.findById(req.user._id)
    const contracts = userContracts.contracts
    res.render("admin/index.ejs", {contracts, user: req.user });
});

router.get("/logout", auth, async (req, res) => {
    delete req.session.token;
    res.redirect("/signin")
})


module.exports = router;