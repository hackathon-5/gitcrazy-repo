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

  app.get('/api/get', function(req, res) {
    console.log("sending something from the get");
    // database.get(db, 'req.params.id');
    db.list({include_docs: true}, function(err, body) {
      if (!err) {
        res.send(body.rows[0]);
      }
    });
    // res.send(req.body);
  });

  app.post('/api/create', function(req, res) {
    console.log("posting create");
    console.log("req.body:", req.body);
    database.create(db, req.body);
    res.send(req.body);
  });

  app.put('/api/update', function(req, res){
    console.log("updatingggg");
    console.log(req.body)
    db.insert(req.body, function(err, body) {
      if(err){console.log("err: ", err);}
      console.log("body:", body);
    });
    res.send(req.body);
  });

  app.get('*', function(req, res) {
    res.sendfile('./app/index.html');
  });

  app.post('/api/sendText', function(req, res) {
    res.send(req.body);
  })
};


