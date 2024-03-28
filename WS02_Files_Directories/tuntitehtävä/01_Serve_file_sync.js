// haetaan tarvittavat moduulit
var http = require("http");
var fs = require("fs");
// luodaan palvelinportti
const PORT = process.env.PORT || 3001;

//create a server object:
const server = http.createServer(function (request, response) {
    // File reading with synchronous method
    try {
        const data = fs.readFileSync('./files/example.txt', 'utf8');
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write(data);
        response.end(); //end the response
        // jos virhe, tulostetaan virheilmoitus konsoliin ja palautetaan 404 Not Found
    } catch (err) {
        console.error(err);
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.write("404 Not Found");
        response.end(); //end the response
    }
});
// palvelin kuuntelee porttia PORT
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
