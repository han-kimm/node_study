const fs = require('fs')
const stream = fs.createReadStream('./read.txt', { highWaterMark: 16 })

const data = [];
stream.on('data', (chunk) => {
  data.push(chunk);
  console.log('data', chunk, chunk.length)
})
stream.on('end', () => {
  console.log('end', Buffer.concat(data).toString())
})
stream.on('error', (err) => {
  console.log('error', err)
})