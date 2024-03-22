const fs = require('fs');
const file = fs.createWriteStream('./big.txt');

for (let i = 0; i <= 1_000_000; i++) {
  file.write('각오해')
}
file.end();