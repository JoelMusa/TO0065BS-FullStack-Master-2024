// var fs = require("fs");
const fs = require('fs');

var data2 = fs.readFileSync("./files/example2.txt");
var data = fs.readFileSync("./files/example.txt");

var uusiData = data + data2;

try {
  fs.writeFileSync("./files/uusiFile.txt", data);
  fs.appendFileSync("./files/uusiFile.txt", data2);
} catch (err) {
  console.log("Tuli virhe " + err);
}

console.log("Results of fileread:");
console.log(data.toString());
console.log(data2.toString());


