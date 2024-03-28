// ladataan tarvittavat modulit

var express = require('express');
var app = express();
var fs = require('fs');

//haetaan dotenv moduuli
const dotenv = require('dotenv').config()

// luodaan palvelinportti

const PORT = dotenv.parsed.PORT00 || 3000;

// Serve static files from the "public" directory
//app.use(express.static('public'));

// Luodaan juurireitti, joka palauttaa selaimeen "Hello World!
app.get('/', function (req, res) {
    res.status(200).send('Hello World!')

});

// Luodaan toinen reitti, joka palauttaa selaimeen... 
app.get('/list', function (req, res) {
    res.status(200).send('Listing data from a textfile!');

});

// Luodaan kolmas reitti, joka palauttaa selaimeen JSONdata.json tiedoston sisällön
app.get('/jsondata', function (req, res) {
    const data = {
        "nimi": "Mikko",
        "email": "mikko@mallikas.com"
    }
    res.json(data);
});

// luodaan reitti, joka parsii .json tiedoston sisällön taulukkomuotoon ja palauttaa sen eslaimeen

app.get('/details', function (req, res) {

    res.status(200).send("Jotain tänne pitää saada....");
});

// luodaan reitti, joka tallentaa uuden käyttäjän tiedot JSONdata.json tiedostoon.
app.get('/add', function (req, res) {

    res.status(200).send("Uusi käyttäjä täytyy lisästä tänne...");
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
    res.status(404).send('Cant find the requested page');
});
// käynnistetään palvelin kuuntelemaan valittua porttia
app.listen(PORT, function () {
    console.log('Example 00 app listening on port: ' + PORT);
});