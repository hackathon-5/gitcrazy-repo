var _            = require('underscore');
var config       = require('../config');
var eventEmitter = require('../events');

module.exports = function(app) {

  app.post('/api/testRoute', function(req, res) {   
    res.send(req.body);
  });
  
  app.get('*', function(req, res) {
    res.sendfile('./app/index.html');
  });
};


