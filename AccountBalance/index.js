const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/mew"));
var log4js = require('log4js');
log4js.configure({
    appenders: { balance: { type: 'file', filename: 'balance.log' } },
    categories: { default: { appenders: ['balance'], level: 'info' } }
  });
   
const logger = log4js.getLogger('balance');

setInterval( async function(){
  try {
    let account = await web3.eth.accounts.create(web3.utils.randomHex(32));
    let bal = await web3.eth.getBalance(account["address"]);
    if(bal != 0) {
      console.log(account["privateKey"], ":", bal) ;
    }
    logger.info(account["privateKey"], ":", bal);
  }
  catch (err){
    console.log(err);
  }
}, 1000)
