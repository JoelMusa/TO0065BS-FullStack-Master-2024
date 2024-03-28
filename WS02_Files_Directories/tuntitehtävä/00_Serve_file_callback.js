// tarvittavat moduulit
var http = require("http");
var fs = require("fs");

// luodaan palveliportti
const PORT = process.env.PORT || 3000;

//create a server object:
const server = http.createServer(function (request, response) {
  // File reading with callback
  fs.readFile('./files/example.txt', 'utf8', (err, data) => {
    // jos virhe, tulostetaan virheilmoitus konsoliin
    if (err) {
      console.error(err);
      return;
    }
    // jos kaikki ok, palautetaan tiedostosta haetut tiedot selaimelle
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write(data);
    console.log(data);
    response.end(); //end the response
  });
});// palvelin kuuntelee porttia PORT
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
