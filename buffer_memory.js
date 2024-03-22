const fs = require('fs');

console.log('before:', process.memoryUsage().rss);

const datal = fs.readFileSync('./big.txt');
fs.writeFileSync('./big2.tsx', datal);

console.log('after:', process.memoryUsage().rss);
