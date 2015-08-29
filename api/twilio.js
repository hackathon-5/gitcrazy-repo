var client = require('twilio')('AC41511d4c3824c31030952a5c38f413ab', 'a465b3c66a710f1baf9c16617c39a44f');

function sendMessage() {
  client.sendMessage({
    to: '+18034682388',
    from: '+18645015817',
    body: 'make time for your wife bozo'
  }, function(err, res) {
    if(err){console.log("err:", err);}
    console.log("res:", res);
  })
}

module.exports = {
  sendMessage: sendMessage
};