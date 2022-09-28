//jshint esversion:6


//require mongoose
const mongoose = require("mongoose");

//connect to the fruitsDB usnig mongooose
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true })


//create new fruit schema - format for how fruit data is saved
const fruitSchema = new mongoose.Schema({
  name: {
    type : String,
    required: [true, 'Please check your data entry, Type in the name of your fruit']  //validation - required field
  },
  rating: {
    type: Number,    //dataType
    min: 1,         // minimum value
    max: 10        // maximum value
  },
  review: String  
})

// fruit collection which follows the schema - NB, this "Fruit" changes to its plural form in the DB
const Fruit = mongoose.model("Fruit", fruitSchema);


//add a fruit using the format
const fruit = new Fruit({
  // name: "Apple",   
  rating: 8,
  review: "Peach is healthy"
});


//save the fruit
// fruit.save();

// create a format for saving a person's data. update the person schema to allow a favourite fruit by linking the fruit schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit : fruitSchema
});

// create person collection which follows the schema 

const Person = mongoose.model("Person", personSchema);


//add a new fruit
const pineapple = new Fruit({
  name : "pineapple",
  score : "9",
  review: "Great Fruit"
});

//save fruit
// pineapple.save();

const pear = new Fruit({
  name: "pear",
  score: 8,
  review: "great fruit"
})

pear.save();




// add a person's data , update data to allow for favourite fruit linked to an already saved fruit 
const person = new Person({
  name: "Amy",
  age: 37,
  favouriteFruit: pineapple
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

//update name of peach data in the fruits collection using the id

Person.updateOne({name: "John"}, {favouriteFruit: pear}, function(err){
  if (err){
    console.log(err)
  } else {
    console.log("successfully updated");
  }
})

// Fruit.updateOne({_id : "63348605f11465e186389ece" }, {name : "peach"}, function (err){
//   if (err) {
//     console.log(err)
//   }else {
//     console.log("updated field name");
//   }
// })


//delete one data in the fruits collection

// Fruit.deleteOne({ name: 'Apple' }, function (err) {
//   if (err){
//     console.log(err)
//   } else {
//     console.log("successfully deleted document")
//   }
// });


// deleting multiple records named John

// Person.deleteMany({ name: "John"}, function(err){
//   if (err) {
//     console.log(err)
//   } else {
//     console.log( "successfully deleted all John's from the DB");
//   }
// })









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