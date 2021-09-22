import web3 from './web3'
const compiledFactory = require('./build/accountfactory.json');

const instance = new web3.eth.Contract(
    compiledFactory,
    '0xC7Cd8F16D7ff47586045187Eb02038F14d3853cD'
)

export default instance;