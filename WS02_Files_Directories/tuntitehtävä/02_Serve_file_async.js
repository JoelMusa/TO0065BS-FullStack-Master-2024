var http = require("http");
var fs = require("fs/promises");
const path = require("path");
const PORT = process.env.PORT || 3002;


const server = http.createServer(function (request, response) {
    const filePath = path.join(__dirname, "files", "example.txt");
    // console.log(filePath);
    async function serveFile(filePath, response) {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            //           console.log(data);
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write(data);
            response.end(); //end the response

        } catch (err) {
            console.error(err);
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.write("404 Not Found");
            response.end(); //end the response  
        }
    }
    serveFile(filePath, response);
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
