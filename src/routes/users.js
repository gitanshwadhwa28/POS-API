const express = require('express');
const router = express.Router();
const userController = require("../controller/user_controller") 
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

const User = require('../models/user');

router.post('/signup',forwardAuthenticated, userController.signup);

router.post('/signin', forwardAuthenticated, userController.signin);

router.post("/forgetPassword", userController.forgetPassword);

router.get("/logout", userController.logout)

module.exports = router;