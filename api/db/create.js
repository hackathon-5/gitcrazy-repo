var mysql = require('mysql');

function create(db, params) {
  console.log("creating");
  db.insert(params, function (err, body) {
    if(err){console.log("err:", err);}
    console.log("body:", body);
  });
};

module.exports = {
  create: create
};