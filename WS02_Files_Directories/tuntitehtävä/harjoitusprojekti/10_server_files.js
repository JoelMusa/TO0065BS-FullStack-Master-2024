//ladataan tarvittavat modulit
const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
// const logEvents = require('./logEvents');
const EventEmitter = require("events");
class Emitter extends EventEmitter { }

const PORT = process.env.PORT || 5000;

// initialize object
const myEmitter = new Emitter();


//luodaan funktio, joka palauttaa tiedoston tai 404.html. Funktio ottaa parametreina tiedoston polun, contentTypen ja vastausolion. 
const serveFile = async (filePath, contentType, response) => {
    //luetaan tiedosto, jos contentTypenä on application/json, muutetaan tiedoston sisältö JSON-objektiksi, jos contentTypenä on jotain muuta kuin image, muutetaan tiedoston sisältö merkkijonoksi.
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf-8' : ''
        );

        const data = contentType === 'application/json'
            ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200,
            { 'Content-Type': contentType }
        );
        console.log(contentType)
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    } catch (err) {
        console.log(err);
        myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
        response.statusCode = 500;
        response.end();
    }
}

//create server

const server = http.createServer((req, res) => {
    console.log(req.url, req.method + " req.url.slice(-1) " + req.url.slice(-1));
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

    const extension = path.extname(req.url);

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css; charset=utf-8';
            break;
        case '.js':
            contentType = 'text/javascript; charset=utf-8';
            break;
        case '.json':
            contentType = 'application/json; charset=utf-8';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain; charset=utf-8';
            break;
        default:
            contentType = 'text/html; charset=utf-8';
    }

    //ternary operaattori palauttaa arvon muuttujaan filePath (vertaa if-rakenne) 
    let filePath =
        //jos contentType on text/html ja req.url on /, palautetaan views kansiosta index.html
        contentType === 'text/html; charset=utf-8' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            //jos contentType on text/html ja req.url päättyy /, palautetaan views +  reg.url + index.html
            : contentType === 'text/html; charset=utf-8' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                //muissa tapauksissa palautetaan views + req.url
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    //muissa tapauksissa palautetaan __dirname + req.url
                    : path.join(__dirname, req.url);

    // makes .html extension not required in the browser
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        serveFile(filePath, contentType, res);
    } else {
        console.log(path.parse(filePath));
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'Location': '/new-page.html' });
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' });
                res.end();
                break;
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }

});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
