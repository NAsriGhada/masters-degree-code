// models/Person.js
const mongoose = require("../db");

// Person Prototype:
// name: string [required]
// age: number
// favoriteFoods: array of strings

const personSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, default: null },
    favoriteFoods: { type: [String], default: [] }, // Typed as [String] to avoid Mixed type issues
  },
  { timestamps: true }
);

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
