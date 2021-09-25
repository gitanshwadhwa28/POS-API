const mongoose = require('mongoose');
const express = require("express");
var router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  contracts: [{
    address: {
      type: String,
    }
  }]
});

/**
* Exporting schema with collection as CrudOperations
*/

UserSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.VERIFY_TOKEN)

  user.tokens = user.tokens.concat({ token })
  user.save()
  return token
}

UserSchema.methods.addAddress = async function (address) {
  const user = this
  console.log(address)
  user.contracts = user.contracts.concat({ address })
  user.save()
  return address
}

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('no user exists with this email')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('unable to login!')
  }

  return user
}

mongoose.pluralize(null);
const User = mongoose.model('User', UserSchema);

module.exports = User;