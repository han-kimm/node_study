const fs = require('fs');

// fs.readFile('./read.txt')
//   .then((data) => {
//     console.log(data);
//     console.log(data.toString())
//   })
//   .catch((err) => {
//     throw err
//   })

// fs.writeFile('./read.txt', "왜 그래?")

fs.readFile('./read.txt', (err, data) => {
  console.log('1번', data.toString())
  fs.readFile('./read.txt', (err, data) => {
    console.log('2번', data.toString())
  })
})