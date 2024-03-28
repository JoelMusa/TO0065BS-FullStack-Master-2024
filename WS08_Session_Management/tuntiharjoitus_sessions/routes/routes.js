const express = require('express')
const router = express.Router()
const path = require('path');
let ejs = require('ejs');
var app = express()
const filePath = path.join(__dirname, '../public')

app.use(express.static("public"));

router.get('/', (req, res) => {
    res.sendFile(filePath + 'index.html')
})
// Kirjautumissivu lukee käyttäjän syöttämät tiedot ja tarkistaa ne. Jos käyttäjän antamat tiedot ovat oikein, annetaan req.session.loggedin -muuttujalle arvoksi true ja req.session.username -muuttujalle arvoksi käyttäjän email. Tämän jälkeen käyttäjä ohjataan userpage -sivulle. Jos käyttäjän antamat tiedot ovat väärin, käyttäjä ohjataan takaisin kirjautumissivulle.    
router.post('/kirjaudu', (req, res) => {
    console.log('Serveri: ' + req.body.pass + ' ' + req.body.email)
    var email = req.body.email
    var pass = req.body.pass

    if (email === "onni@sci.fi" && pass === "opiskelija") {
        req.session.loggedin = true
        req.session.username = email
        res.redirect('/userpage')

    } else {
        res.sendFile(filePath + '/failed_login.html')

    }
})
// Jos käyttäjä on kirjautunut, hänelle näytetään userpage -sivu, jossa lukee "Tervetuloa" ja käyttäjän sähköpostiosoite. Jos käyttäjä ei ole kirjautunut, hänet ohjataan takaisin kirjautumissivulle.  
router.get('/userpage', (req, res) => {
    if (req.session.loggedin == true) {
        email = req.session.username
        //res.sendFile(filePath + '/etusivu.html')
        res.render('index', { email: email })
        //res.status(200).send('Tervetuloa ' + req.session.username)
    } else res.redirect('/')
})
// Kun käyttäjä painaa logout -nappia, hänen sessiotietonsa tuhotaan ja hänet ohjataan takaisin kirjautumissivulle.
router.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
        console.log("Session tiedot tuhottu.");
        res.redirect("/");
    });
});

router.get("*", function (req, res) {
    //res.send("Cant find the requested page", 404);
    res.sendFile(filePath + '/error.html')
})

module.exports = router
