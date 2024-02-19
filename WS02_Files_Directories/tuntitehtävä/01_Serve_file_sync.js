var http = require("http");
var fs = require("fs");
const PORT = process.env.PORT || 3001;

//create a server object:
const server = http.createServer(function (request, response) {
    try {
        const data = fs.readFileSync('./files/example.txt', 'utf8');
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write(data);
        response.end(); //end the response

    } catch (err) {
        console.error(err);
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.write("404 Not Found");
        response.end(); //end the response
    }
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
