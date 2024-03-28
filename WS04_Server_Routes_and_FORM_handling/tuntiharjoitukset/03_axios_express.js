//haetaan express moduuli
const express = require("express");
//haetaan axios moduuli
const axios = require("axios");
//haetaan dotenv moduuli
const dotenv = require('dotenv').config()
//haetaan API_KEY .env tiedostosta
const API_KEY = dotenv.parsed.API_KEY;
// luodaan express-instanssi
const app = express();
//haetaan PORT ympäristömuuttuja .env tiedostosta
const PORT = dotenv.parsed.PORT03 || 3003;


// Luodaan reitti (route) GET-pyyntö 
app.get("/", function (req, res) {
    // Luodaan AJAX-kysely ja lähetetään pyyntö
    const promise = axios
        // 
        .get("http://www.omdbapi.com/?s=Bond&apikey=" + API_KEY)
        // Käsitellään vastaus kun se saapuu
        .then((response) => {
            const data = response.data;

            res.writeHead(200, { "Content-Type": "text/html" });
            for (var i = 0; i < data.Search.length; i++) {
                res.write("<h3>" + data.Search[i].Title + "</h3>");
                res.write("<img src='" + data.Search[i].Poster + "'>");
            }
            res.end(); //HTTP vastaus päättyy
        });
});

app.listen(PORT, function () {
    console.log('Example app listening on port: ' + PORT);
});

