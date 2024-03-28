const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// bring in the environment variables
require('dotenv').config();

const URI = process.env.MONGODB_URI;

const url =
    // Connect to MongoDB
    mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });

// Define routes and middleware
// ...

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});