var fs = require('fs');
fs.writeFileSync("food.txt","I like potato");
console.log(fs.readFileSync("food.txt").toString());
