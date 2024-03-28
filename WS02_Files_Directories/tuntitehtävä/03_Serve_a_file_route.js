//ladataan tarvittavat modulit
const http = require("http");
const path = require("path");
const fs = require("fs");
// luodaan palvelinportti
const PORT = process.env.PORT || 3003;

//create server

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  let filePath;
  // jos pyydetään juurisivua tai index.html, palautetaan index.html
  if (req.url === "/" || req.url === "/index.html") {
    // kirjoitetaan vastausotsake HTML-muotoon
    res.writeHead(200, { "Content-Type": "text/html" });
    // määritellään tiedoston polku
    filePath = path.join(__dirname, "views", "index.html");
    // luetaan tiedosto ja palautetaan se selaimelle
    fs.readFile(filePath, 'utf8', (err, data) => {
      // jos virhe, tulostetaan virheilmoitus
      if (err) throw err;
      // jos kaikki ok, palautetaan tiedostosta haetut tiedot selaimelle
      res.end(data);
    });
    // jos pyydetään about.html, palautetaan about.html
  } else if (req.url === "/about.html") {
    // kirjoitetaan vastausotsake HTML-muotoon
    res.writeHead(200, { "Content-Type": "text/html" });
    // määritellään tiedoston polku
    filePath = path.join(__dirname, "views", "about.html");
    // luetaan tiedosto ja palautetaan se selaimelle
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
