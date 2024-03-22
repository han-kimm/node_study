const fs = require('fs');

const streamR = fs.createReadStream('./read.txt', { highWaterMark: 16 });
const streamW = fs.createWriteStream('./read2.txt');
streamR.pipe(streamW)
