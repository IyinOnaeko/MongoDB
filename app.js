//jshint esversion:6

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruitsDB';

// Create a new MongoClient
const client = new MongoClient(url, {useNewUrlParser: true});

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  // insertDocuments(db, function() {
    findDocuments(db, function() {

    client.close();
});
});

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([

    {
      name : "Apple",
      score : 6,
      review : "sweet"
    },
    {
      name : "Orange",
      score : 8,
      review : "sour"
    },
    {
      name : "Pineapple",
      score : 4,
      review : "kinda sour"
    }

  ], function(err, result) {
    if(err) throw err;
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}


const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}