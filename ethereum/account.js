const web3 = require('./web3')
const account = require('./build/account.json');

const Account = (address) => { return new web3.eth.Contract(account.abi, address) }

module.exports = Account