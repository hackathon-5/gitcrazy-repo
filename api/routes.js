var _            = require('underscore');
var config       = require('../config');
var eventEmitter = require('../events');
var nano = require('nano')(config.db.url);
nano.db.create(config.db.name);
var db = nano.use(config.db.name);
// var mysql = require('mysql');

module.exports = function(app) {

  app.post('/api/testRoute', function(req, res) {
    res.send(req.body);
  });

  app.get('/api/get/:id', function(req, res) {
    console.log("sending something from the get");
    sql.get('req.params.id');
    res.send(req.body);
  });

  app.post('/api/create', function(req, res) {
    console.log("posting create");
    // req.body
    sql.create('params');
    res.send(req.body);
  });

  app.put('/api/update/:id', function(req, res){
    console.log("updating");
    sql.update('req.params.id');
    res.send(req.body);
  });

  app.get('*', function(req, res) {
    res.sendfile('./app/index.html');
  });
};


