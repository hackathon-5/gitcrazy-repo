function get(db, id) {
  console.log("getting shit from the get");
  db.get(id, function (err, body) {
    if(err){console.log("err:", err);}
    console.log("body:", body);
  })
};

module.exports = {
  get: get
};