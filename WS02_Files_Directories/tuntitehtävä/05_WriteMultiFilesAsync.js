// var fs = require("fs");
const fs = require('node:fs/promises');

async function example() {
    try {
        const content = 'Jotain sisltöä tiedostoon\n';
        await fs.writeFile('./files/uusiFile2.txt', content);
        const content2 = 'Lisää sisältöä tiedostoon\n';
        await fs.writeFile('./files/uusiFile2.txt', content2, { flag: 'a+' }, err => { });
    } catch (err) {
        console.log(err);
    }
}
example();
