const express = require('express');
const router = express.Router();
const userController = require("../controller/user_controller")
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

const User = require('../models/user');

router.get('/signup', forwardAuthenticated, function (req, res) {
    res.render("register");
});
router.post('/signup', forwardAuthenticated, async (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    console.log(req.body.name)

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 3) {
        errors.push({ msg: 'Password must be at least 3 characters' });
    }


    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(400).send('Email already exist');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })

    try {
        const savedUser = await user.save();
        res.redirect("signin");
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/signin', forwardAuthenticated, function (req, res) {
    res.render("login");
});
router.post('/signin', forwardAuthenticated, userController.signin);

router.post("/forgetPassword", userController.forgetPassword);

router.get("/logout", userController.logout)

router.get('/homepage', function (req, res) {
    res.render("homepage");
})

module.exports = router;