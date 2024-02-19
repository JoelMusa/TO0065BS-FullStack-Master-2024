const http = require('http');
const express = require('express');
const app = express();
const hostname = '127.0.0.1';
//const request = require("request");
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/HTML; charset=utf-8');
    res.write("<h1>Millainen on WEB arkkitehtuuri?</h1>"); //write a response to the client
    res.write("<h2>Tällaiselta se näyttää...</h2> ");
    res.write(
        " <img src='https://casamedia.fi/sites/default/files/services/casamedia-sovelluskehitys.jpg'><br>"
    );

    var data =
        "<br><br><table border='2'><tr><td>Jari</td><td>Jari_2</td></tr><tr><td>Kolmas Jari</td><td>Neljäs Jari</td></tr></table>";
    res.write(data);

    res.end("<br><br><strong>This is the end</strong>"); //end the response
});

server.listen(PORT);
console.log(`Server running at http://${hostname}:${PORT}/`);
