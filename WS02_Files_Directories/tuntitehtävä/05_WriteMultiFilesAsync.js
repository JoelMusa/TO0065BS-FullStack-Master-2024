// var fs = require("fs");

// luetaan tiedostojen tiedot promiseilla (async)
const fs = require('node:fs/promises');
// kirjoitetaan tiedostoon dataa promiseilla (async)
async function example() {
    // kirjoitetaan tiedostoon dataa
    try {
        const content = 'Jotain sisltöä tiedostoon\n';
        // kirjoitetaan tiedostoon muuttujasta content  (tiedosto luodaan jos sitä ei ole)
        await fs.writeFile('./files/uusiFile2.txt', content);
        const content2 = 'Lisää sisältöä tiedostoon\n';
        // lisätään tiedostoon muuttujasta content2
        await fs.writeFile('./files/uusiFile2.txt', content2, { flag: 'a+' }, err => { });
    } catch (err) {
        console.log(err);
    }
}
example();
