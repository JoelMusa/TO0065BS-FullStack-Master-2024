// Otetaan moduuli käyttöön
require("dotenv").config();
var mongoose = require("mongoose");

// Määritellään yhteysosoite
var user = process.env.DB_USER
var salis = process.env.DB_PASS
const uri = process.env.MONGODB_URI

main().catch(err => console.log(err));

/* Luodaan yhteys tietokantaan */
async function main() {
    await mongoose.connect(
        uri,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Yhteys on muodostettu!");
    mongoose.connection.close();
    console.log("Yhteys on suljettu!");

}