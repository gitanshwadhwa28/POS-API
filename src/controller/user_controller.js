const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const passport = require('passport');

exports.signup = async (req, res) => {
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
        console.log("hah")
        const savedUser = await user.save();
        console.log(savedUser)
        res.redirect("signin");
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.signin = (req, res, next) => {

    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/signin'
    })(req, res, next);

};

exports.forgetPassword = async (req, res) => {
    const { email, password, password2 } = req.body;

    if (!email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 3) {
        errors.push({ msg: 'Password must be at least 3 characters' });
    }

    console.log("Forget Password")
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const userExists = await User.findOne({ email: req.body.email });

    console.log("User: " + userExists)
    if (userExists) {
        User.findOneAndUpdate({ email: email },
            { password: hashPassword }, null, function (err, docs) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Original Doc : ", docs);
                }
            });
    }
    else {
        console.log("Error in changing password")
        res.status(400).status("Error in changing password")
    }
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect("signin");
}

