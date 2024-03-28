const express = require('express')
const router = express.Router()
const axios = require("axios");
const API_KEY = process.env.API_KEY;


// async funktion määrittely, joka hakee elokuvatietoja
async function getMovies() {
    // kutsutaan axios.get-metodia ja saadaan promise-objekti
    try {
        const response = await axios.get("http://www.omdbapi.com/?s=Vares&apikey=" + API_KEY);
        //console.log(response.data.Search);
        return response.data;
    } catch (error) {
        //console.error(error);
    }

}
// määritellään reitti, joka vastaa juurireittiä
router.get("/", function (req, res) {

    // kutsutaan getMovies-funktio ja saadaan vastaus promise-objektin avulla
    // kutsutaan then-metodia, joka käsittelee promise-objektin vastauksen
    // joka sisältää elokuvatietoja
    // kutsutaan res.write()-metodia, joka kirjoittaa vastauksen html sivulle
    getMovies()
        .then((data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            for (var i = 0; i < data.Search.length; i++) {
                res.write("<h3>" + data.Search[i].Title + "</h3>");
                res.write("<img src='" + data.Search[i].Poster + "'>");
            }
            res.end(); //HTTP vastaus päättyy
        });
}
);
//viedään router käyttöön serverillä
module.exports = router