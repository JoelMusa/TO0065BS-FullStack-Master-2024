// var fs = require("fs");
const fs = require('fs');
// luetaan tiedostot
var data2 = fs.readFileSync("./files/example2.txt");
var data = fs.readFileSync("./files/example.txt");
// yhdistetään tiedostojen sisältö
var uusiData = data + data2;
// kirjoitetaan uusi tiedosto
try {
  // kirjoitetaan tiedostoon data
  fs.writeFileSync("./files/uusiFile.txt", data);
  // lisätään tiedostoon data2
  fs.appendFileSync("./files/uusiFile.txt", data2);
} catch (err) {
  console.log("Tuli virhe " + err);
}

console.log("Results of fileread:");
console.log(data.toString());
console.log(data2.toString());


