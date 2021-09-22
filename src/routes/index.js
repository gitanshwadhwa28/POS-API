const express = require("express");
var router = express.Router();

router.use('/', require('./users.js'));

module.exports = router;