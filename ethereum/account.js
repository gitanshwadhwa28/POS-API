import web3 from './web3'
const abi = require('./build/account.json');

const Account = (address) => { return new web3.eth.Contract(abi, address) }

export default Account;