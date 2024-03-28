// Otetaan moduuli käyttöön
require("dotenv").config();
var mongoose = require("mongoose");
const Kitten = require("./modules/model");
// Määritellään yhteysosoite
var user = process.env.DB_USER
var salis = process.env.DB_PASS
const uri = process.env.MONGODB_URI;


// Luodaan yhteys

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Yhteys on muodostettu!");
    /* Luodaan uusi kitten olio ja tulostetaan sen nimi konsoliin */
    const silence = new Kitten({ name: 'Silence' });
    console.log(silence.name); // 'Silence'
    const fluffy = new Kitten({ name: 'Fluffy' });
    const turbo = new Kitten();
    fluffy.speak(); // "Meow name is Fluffy"
    silence.speak();
    turbo.speak();
    mongoose.connection.close();
    console.log("Yhteys on suljettu!");
}