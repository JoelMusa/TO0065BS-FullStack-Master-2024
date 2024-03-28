// Otetaan express-moduuli käyttöön
const express = require("express");
var app = express();
const router = require("./routes/routes");
// set the view engine to ejs
app.set('view engine', 'ejs');
// Otetaan express-sessiot käyttöön, jotta voidaan käyttää sessiomuuttujia
const session = require("express-session");
var bodyParser = require("body-parser");
const PORT = 3000;
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Asetetaan sessiomuuttujan tiedot
app.use(
    session({
        name: "logindemo",          // the name of the session id cookie
        resave: true,               // Forces the session to be resaved back to the session store if not modified (if set to true)
        saveUninitialized: true,    // This forces a new session to be saved when it is created new, before being modified
        secret: "salausavain",      // used to sign the session cookie, use something secure!
        // This is the max-age of the cookie in ms, so make sure you set it appropriately, in my case about 60s/1min
        cookie: {
            secure: false, // if true, only transmit cookie over https
            maxAge: 1000 * 3600
        } // this is the expiration date in milliseconds, in this case 1 hour
    })
);

app.use(express.static("public"));
app.use("/", router);
app.use("/kirjaudu", router);
app.use("/userpage", router);
app.use("/logout", router);
app.use("*", router);

// Web-palvelimen luonti Expressin avulla
app.listen(PORT, function () {
    console.log("Example app listening on port " + PORT + "!");
});
