var _            = require('underscore');
var config       = require('../config');
var eventEmitter = require('../events');
var sql = require('./sql');
// var mysql = require('mysql');

module.exports = function(app) {

  app.post('/api/testRoute', function(req, res) {   
    res.send(req.body);
  });

  app.get('/api/get', function(req, res) {
    console.log("sending something from the get");
    console.log(sql);
    sql.get();
    res.send(req.body);
  });
  
  app.get('*', function(req, res) {
    res.sendfile('./app/index.html');
  });
};


