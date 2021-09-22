const web3 = require('./web3')
const compiledFactory = require('./build/accountfactory.json');

const instance = new web3.eth.Contract(
    compiledFactory.abi,
    '0xC7Cd8F16D7ff47586045187Eb02038F14d3853cD'
)

module.exports = instance
