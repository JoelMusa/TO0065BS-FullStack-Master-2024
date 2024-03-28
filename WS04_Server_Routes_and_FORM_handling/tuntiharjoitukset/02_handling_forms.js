// ladataan tarvittavat modulit

var express = require('express');
var app = express();
var fs = require('fs');

//haetaan dotenv moduuli
const dotenv = require('dotenv').config();
// luodaan palvelinportti
const PORT = dotenv.parsed.PORT02 || 3002;

// Serve static files from the "public" directory
app.use(express.static('public'));

// luo juurireitti, joka palauttaa selaimeen index.html tiedoston sisällön
app.get('/', function (req, res) {
    //res.send('Hello World!');
    res.sendFile(__dirname + '/index.html');
});
// luo toinen reitti, joka palauttaa selaimeen tekstidata.txt tiedoston sisällön
app.get('/list', function (req, res) {
    //res.send('Listing data from a file!');
    res.sendFile(__dirname + "/data/tekstidata.txt");
});

// luo kolmas reitti, joka palauttaa selaimeen JSONdata.json tiedoston sisällön
app.get('/jsondata', function (req, res) {
    var data = require(__dirname + '/data/JSONdata.json');
    res.json(data);
});

// parse application/x-www-form-urlencoded 
const bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded


// luodaan reitti, joka parsii .json tiedoston sisällön taulukkomuotoon ja palauttaa sen selaimeen
app.get('/details', function (req, res) {
    var data = require(__dirname + '/data/JSONdata.json');

    // Parse the results into a variabke
    var results = '<table border="1"> ';

    for (var i = 0; i < data.length; i++) {
        results +=
            '<tr>' +
            '<td>' + data[i].Name + '</td>' +
            '<td>' + data[i].Email + '</td>' +
            '<td>' + data[i].Date + '</td>' +
            '</tr>';
    }

    res.send(results);
});

// lisätään GET polku (route) joka hakee /public/adduser.html tiedoston ja lähettää sen selaimeen 
app.get('/adduser', function (req, res) {
    res.sendFile(__dirname + '/public/adduser.html');

})

// lisätään POST polku (route) joka hakee tiedot ja tallentaa ne JSONdata.json tiedostoon.
app.post('/adduser', function (req, res) {
    // Load the existing data from a file and assign to an array (lista)
    const data = require(__dirname + '/data/JSONdata.json');

    //luodaan uusi henkilö...
    const nimi = req.body.name
    const email = req.body.email
    const company = req.body.company;
    const date = new Date().getDate() + "/" + (1 + parseInt(new Date().getMonth())) + "/" + new Date().getFullYear();
    //...ja pusketaan uusi käyttäjä listan (tiedoston) viimeiseksi
    data.push({
        "Name": nimi,
        "Company": email,
        "Email": company,
        "Date": date

    });

    // Convert the JSON object to a string format 
    var jsonStr = JSON.stringify(data);

    // Write data to a file
    fs.writeFile(__dirname + '/data/JSONdata.json', jsonStr, (err) => {
        if (err) throw err;
        console.log("tiedot tallennettu...")
    })
    res.send("Saved the data to a file. Browse to the /details to see the contents of the file");
});

/* app.get('/add', function (req, res) {
    //res.send('Lets try to add some data to a JSONfile!');
    var data = require(__dirname + '/data/JSONdata.json');
    // Luodaan uusi käyttäjä...
    const date = new Date().getDate() + "/" + (1 + parseInt(new Date().getMonth())) + "/" + new Date().getFullYear();
    const uusi = {
        "Name": "Mikko Mallikas",
        "Company": "Oma Yritys Oy",
        "Email": "Mikko@mallikas.com",
        "Date": date
    }
    //...ja pusketaan uusi käyttäjä listan (tiedoston) viimeiseksi
    data.push(uusi);

    // seuraavaksi lista täytyy konvertoida merkkijonoksi (JSON.stringify() ennen tallennusta - lisätietoja täältä https://blog.logrocket.com/reading-writing-json-files-node-js-complete-tutorial/
    var jsonStr = JSON.stringify(data);
    // ...ja lopuksi tallennetaan tiedosto...

    fs.writeFile(__dirname + '/data/JSONdata.json', jsonStr, (err) => {
        if (err) throw err;
        console.log("tiedot tallennettu...")
    })
    res.send("Uusi käyttäjä tallennettu...Voit katsoa tiedoston reitin /details takaa....");
}); */

//The 404 Route (ALWAYS Keep this as the last route)
//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
    //res.send('Cant find the requested page', 404);
    res.sendFile(__dirname + '/public/error.html');
});

// käynnistetään palvelin kuuntelemaan valittua porttia
app.listen(PORT, function () {
    console.log('Example 02 app listening on port: ' + PORT);
});