//ladataan tarvittavat modulit
const http = require("http");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3003;

//create server

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  let filePath;

  if (req.url === "/" || req.url === "/index.html") {
    res.writeHead(200, { "Content-Type": "text/html" });
    filePath = path.join(__dirname, "views", "index.html");
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  } else if (req.url === "/about.html") {
    res.writeHead(200, { "Content-Type": "text/html" });
    filePath = path.join(__dirname, "views", "about.html");
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
