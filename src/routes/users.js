const express = require('express');
const router = express.Router();
const userController = require("../controller/user_controller") 
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

const User = require('../models/user');

router.get('/signup', forwardAuthenticated, function(req, res){
    res.render("register");
});
router.post('/signup',forwardAuthenticated, userController.signup);

router.get('/signin',forwardAuthenticated, function(req, res){
    res.render("login");
});
router.post('/signin', forwardAuthenticated, userController.signin);

router.post("/forgetPassword", userController.forgetPassword);

router.get("/logout", userController.logout)

module.exports = router;