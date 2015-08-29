var config       = require('./config');
var nano = require('nano')(config.db.url);
nano.db.create(config.db.name);
var db = nano.use(config.db.name);

db.insert(
  {
  "_id": "71666c66203fd6acf6239bda1e00461c",
  "name": "Brian Kelsey",
  "category": [
      {
          "name": "husband",
          "size": 3,
          "events": [
              {
                  "name": "Golf",
                  "value": 1
              },
              {
                  "name": "Drinking",
                  "value": 1
              },
              {
                  "name": "Half Golf",
                  "value": 1
              }
          ]
      },
      {
          "name": "Dummy",
          "size": 0
      },
      {
          "name": "family",
          "size": 6,
          "events": [
              {
                  "name": "playtime",
                  "value": 1
              },
              {
                  "name": "park",
                  "value": 1
              },
              {
                  "name": "zoo",
                  "value": 1
              },
              {
                  "name": "ER",
                  "value": 1
              },
              {
                  "name": "grandmas house",
                  "value": 1
              },
              {
                  "name": "Something",
                  "value": 1
              }
          ]
      },
      {
          "name": "wife",
          "size": 2,
          "events": [
              {
                  "name": "Spa Day",
                  "value": 1
              },
              {
                  "name": "Pooped",
                  "value": 1
              }
          ]
      },
      {
          "name": "couples",
          "size": 5,
          "events": [
              {
                  "name": "Dinner",
                  "value": 1
              },
              {
                  "name": "Movie",
                  "value": 1
              },
              {
                  "name": "Argue",
                  "value": 1
              },
              {
                  "name": "Date Night",
                  "value": 1
              },
              {
                  "name": "Testing",
                  "value": 1
              }
          ]
      }
  ]
}, function(err, body) {
  if(err){console.log("err:", err);}
  console.log("body:", body);
}
)
