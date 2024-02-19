var http = require("http");
var fs = require("fs");
const PORT = process.env.PORT || 3000;

//create a server object:
const server = http.createServer(function (request, response) {
  fs.readFile('./files/example.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write(data);
    response.end(); //end the response
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
