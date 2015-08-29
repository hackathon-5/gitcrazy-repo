var _            = require('underscore');
var config       = require('../config');
var eventEmitter = require('../events');
var database = require('./db');
var nano = require('nano')(config.db.url);
nano.db.create(config.db.name);
var db = nano.use(config.db.name);

module.exports = function(app) {

  app.post('/api/testRoute', function(req, res) {
    res.send(req.body);
  });

  app.get('/api/get/:id', function(req, res) {
    console.log("sending something from the get");
    database.get(db, 'req.params.id');
    res.send(req.body);
  });

  app.post('/api/create', function(req, res) {
    console.log("posting create");
    console.log("req.body:", req.body);
    database.create(db, req.body);
    res.send(req.body);
  });

  app.put('/api/update/:id', function(req, res){
    console.log("updatingggg");
    database.update(db, 'req.params.id');
    res.send(req.body);
  });

  app.get('*', function(req, res) {
    res.sendfile('./app/index.html');
  });
};


