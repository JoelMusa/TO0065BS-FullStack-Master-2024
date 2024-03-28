// haetaan tarvittavat moduulit
var http = require("http");
var fs = require("fs/promises");
// haetaan polkumoduuli, joka mahdollistaa tiedostojen käsittelyn
const path = require("path");
// luodaan palvelinportti
const PORT = process.env.PORT || 3002;

//create a server object:
const server = http.createServer(function (request, response) {
    //assign the file path to a variable
    const filePath = path.join(__dirname, "files", "example2.tt");
    // console.log(filePath)
    // File reading with asynchronous method;
    async function serveFile(filePath, response) {
        // luetaan tiedosto
        try {
            // assign the file data to a variable in an asynchronous way
            const data = await fs.readFile(filePath, 'utf-8');
            //           console.log(data);
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
    }
    // kutsutaan funktiota jolla palvellaan tiedosto tai palautetaan virheilmoitus
    serveFile(filePath, response);
});

// palvelin kuuntelee porttia PORT
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
