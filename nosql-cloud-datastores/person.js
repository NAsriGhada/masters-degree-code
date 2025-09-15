// person.js
// This file implements ALL required checkpoint functions using callbacks.
// Run with: `node person.js` (adjust bottom demo calls as you like)

const Person = require("./models/Person");

// ------------- Create and Save a Record of a Model -------------
function createAndSavePerson(done) {
  // Create a new document instance
  const person = new Person({
    name: "John Doe",
    age: 28,
    favoriteFoods: ["pizza", "pasta"],
  });

  // Save using Node callback style
  person.save(function (err, data) {
    if (err) return done(err);
    return done(null, data);
  });
}

// ------------- Create Many Records with Model.create -------------
function createManyPeople(arrayOfPeople, done) {
  // arrayOfPeople example: [{ name: 'Mary', age: 20, favoriteFoods: ['burritos'] }, ...]
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return done(err);
    return done(null, people);
  });
}

// ------------- Use model.find() to search by name -------------
function findPeopleByName(personName, done) {
  Person.find({ name: personName }, function (err, people) {
    if (err) return done(err);
    return done(null, people);
  });
}

// ------------- Use model.findOne() to find by favorite food -------------
function findOneByFood(food, done) {
  Person.findOne({ favoriteFoods: food }, function (err, person) {
    if (err) return done(err);
    return done(null, person);
  });
}

// ------------- Use model.findById() -------------
function findPersonById(personId, done) {
  Person.findById(personId, function (err, person) {
    if (err) return done(err);
    return done(null, person);
  });
}

// ------------- Classic Update: Find, Edit, then Save -------------
function findEditThenSave(personId, done) {
  const foodToAdd = "hamburger";

  Person.findById(personId, function (err, person) {
    if (err) return done(err);
    if (!person) return done(new Error("Person not found"));

    person.favoriteFoods.push(foodToAdd);

    // Because favoriteFoods is [String], no need for markModified
    person.save(function (saveErr, updated) {
      if (saveErr) return done(saveErr);
      return done(null, updated);
    });
  });
}

// ------------- New Update: findOneAndUpdate (return updated doc) -------------
function findAndUpdate(personName, done) {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { $set: { age: ageToSet } },
    { new: true }, // return updated document
    function (err, updatedDoc) {
      if (err) return done(err);
      return done(null, updatedDoc);
    }
  );
}

// ------------- Delete One: findByIdAndRemove -------------
function removeById(personId, done) {
  Person.findByIdAndRemove(personId, function (err, removedDoc) {
    if (err) return done(err);
    return done(null, removedDoc);
  });
}

// ------------- Delete Many: remove/deleteMany by name = "Mary" -------------
// Note: Model.remove() is deprecated; using deleteMany() returns { acknowledged, deletedCount }
function removeManyPeople(done) {
  Person.deleteMany({ name: "Mary" }, function (err, result) {
    if (err) return done(err);
    // result is a summary (NOT the deleted docs)
    return done(null, result);
  });
}

// ------------- Chain Query Helpers: burritos lovers -------------
// Sort by name (A→Z), limit to 2, hide age
function queryChain(done) {
  Person.find({ favoriteFoods: "burritos" })
    .sort("name")
    .limit(2)
    .select("-age") // exclude age
    .exec(function (err, data) {
      if (err) return done(err);
      return done(null, data);
    });
}

// ----------------- EXPORTS (for tests) -----------------
module.exports = {
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain,
};

// ----------------- DEMO (optional) -----------------
// Uncomment to quickly test locally. Ensure your .env is set and MongoDB is reachable.

// createAndSavePerson(console.log);

// createManyPeople(
//   [
//     { name: 'Mary', age: 25, favoriteFoods: ['burritos', 'salad'] },
//     { name: 'Mary', age: 31, favoriteFoods: ['sushi'] },
//     { name: 'Alex', age: 22, favoriteFoods: ['burritos', 'pizza'] },
//   ],
//   console.log
// );

// findPeopleByName('Mary', console.log);
// findOneByFood('burritos', console.log);
// findPersonById('REPLACE_WITH_ID', console.log);
// findEditThenSave('REPLACE_WITH_ID', console.log);
// findAndUpdate('John Doe', console.log);
// removeById('REPLACE_WITH_ID', console.log);
// removeManyPeople(console.log);
// queryChain(console.log);
