const { exec, spawn } = require('child_process')

// var process = exec('cmd /c chcp 65001>nul && dir');

// const process = spawn('python', ['test.py'])

process.stdout.on('data', function (data) {
  console.log(data.toString());
})

process.stderr.on('data', function (data) {
  console.error(data.toString());
})