//haetaan express moduuli
const express = require("express");
//haetaan axios moduuli
const axios = require("axios");
// luodaan express-instanssi
const app = express();
// haetaan movies.js router
const movies = require('./routes/movies');

//haetaan PORT ympäristömuuttuja .env tiedostosta
const PORT = process.env.PORT05 || 3005;

// käytetään movies.js routeria

app.use('/', movies);

/* // async funktion määrittely, joka hakee elokuvatietoja
async function getMovies() {
    // kutsutaan axios.get-metodia ja saadaan promise-objekti
    try {
        const response = await axios.get("http://www.omdbapi.com/?s=Vares&apikey=" + API_KEY);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }

}

app.get("/", function (req, res) {

    // kutsutaan getMovies-funktio ja saadaan vastaus promise-objektin avulla
    // kutsutaan then-metodia, joka käsittelee promise-objektin vastauksen
    // joka sisältää elokuvatietoja
    // kutsutaan res.write()-metodia, joka kirjoittaa vastauksen html sivulle
    getMovies().then((data) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        for (var i = 0; i < data.Search.length; i++) {
            res.write("<h3>" + data.Search[i].Title + "</h3>");
            res.write("<img src='" + data.Search[i].Poster + "'>");
        }
        res.end(); //HTTP vastaus päättyy
    });
}
); */
// kuunnellaan porttia ja tulostetaan konsoliin viesti
app.listen(PORT, function () {
    console.log('Example app listening on port: ' + PORT);
});

