//jshint esversion:6


//require mongoose
const mongoose = require("mongoose");

//connect to the fruitsDB usnig mongooose
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true })


//create new fruit schema - format for how fruit data is saved
const fruitSchema = new mongoose.Schema({
  name: {
    type : String,
    required: [true, 'Please check your data entry, Type in the name of your fruit']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
})

// fruit collection which follows the schema - NB, this "Fruit" changes to its plural form in the DB
const Fruit = mongoose.model("Fruit", fruitSchema);


//add a fruit using the format
const fruit = new Fruit({
  // name: "Apple",
  rating: 8,
  review: "Cassava is healthy"
});


//save the fruit
fruit.save();

// create a format for saving a person's data 

const personSchema = new mongoose.Schema({
  name: String,
  age: Number
})

// create person collection which follows the schema 

const Person = mongoose.model("Person", personSchema);

// add a person's data 
const person = new Person({
  name: "John",
  age: 37
})

// save  data to the collection
// person.save();



//saving multiple fruits 

// const orange = new Fruit({
//   name: "Orange",
//   score: 4,
//   review: "very nice"
// })

// const banana = new Fruit({
//   name: "Banana",
//   score: 5,
//   review: "nice"
// })

// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 4,
//   review: "very nice"
// })

// inserting and validating records are saved 
// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if (err) {
//     console.log("err");
//   } else {
//     console.log("successfully saved all fruits to fruitsDB");
//   }
// } )

//find names of fruit from each fruit data
Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err)
  } else {

    mongoose.connection.close();

    fruits.forEach(function (fruit) {
      console.log(fruit.name);
    });
  }
})













const findDocuments = function (db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function (err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}