const mongoose = require('mongoose');
const express = require("express");
var router = express.Router();

/**
 * Creating the schema with name, name, password and date
 */
const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
});
  
  /**
 * Exporting schema with collection as CrudOperations
 */

    mongoose.pluralize(null);
    const User = mongoose.model('User', UserSchema);
  
    module.exports = User;