// haetaan tarvittavat moduulit date-fns ja uuid (Universally Unique Identifier (UUID) ), jotka on asennettu npm:n kautta

const { format } = require('date-fns');
// v4 -versio UUID:stä on aikaleimaan perustuva uniikki tunniste
const { v4: uuid } = require('uuid');
// haetaan tarvittavat moduulit fs ja fs.promises, jotka ovat osa Node.js:n ydintoimintoja
const fs = require('fs');
const fsPromises = require('fs').promises;
// haetaan tarvittava moduuli path, joka on osa Node.js:n ydintoimintoja
const path = require('path');
// luodaan funktio logEvents, joka kirjoittaa lokitiedostoon pyynnön tiedot ja ajan leimat
const logEvents = async (message, logName) => {
    // luodaan aikaleima muuttujaan muodossa vuosi, kuukausi, päivä, tunti, minuutti ja sekunti
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    // luodaan lokitietue muuttujaan, joka sisältää aikaleiman, uniikin tunnisteen ja pyynnön tiedot
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    // yritetään kirjoittaa lokitietue lokitiedostoon
    try {
        // tarkistetaan, onko logs-kansiota olemassa path.join -funktiolla
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            // jos kansiota ei ole olemassa, se luodaan fsPromises.mkdir -funktiolla
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        // lokitietue lisätään lokitiedostoon fsPromises.appendFile -funktiolla 
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

// luodaan middleware logger, joka kirjoittaa pyynnön tiedot konsoliin ja lokitiedostoon
const logger = (req, res, next) => {
    // kutsutaan logEvents -funktiota, joka kirjoittaa pyynnön tiedot lokitiedostoon reqLog.txt
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    // kirjoitetaan pyynnön tiedot konsoliin
    console.log(`${req.method} ${req.path}`);
    // next() -funktiolla pyyntö siirtyy seuraavaan middlewareen
    next();
}

module.exports = { logger, logEvents };