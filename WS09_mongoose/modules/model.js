// File: ./modules/model.js

// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const kittySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    }
});

/* methods must be added to the schema before compiling it with mongoose.model() */
kittySchema.methods.speak = function speak() {
    const greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
};

/* The next step is compiling kittySchema- schema into a Model. */
module.exports = mongoose.model('Kitten', kittySchema);