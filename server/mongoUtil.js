'use strict';

let mongo = require('mongodb');
let client = mongo.MongoClient;

let _db;

module.exports = {
  connect() {
    client.connect('mongodb://localhost:27017/olympics-dev', (err, db) => {
      if(err){
        console.log('Could connect to mongo - check mongod started');
        process.exit(1);
      }

      _db = db;
      console.log('Connected to Mongo')
    })
  },
  sports(){
    return _db.collection("sports")
  }
}
