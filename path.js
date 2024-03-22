const path = require('path')

const string = __dirname

console.log("조인", path.join(string, '../', '/var.js'));
console.log("리졸브", path.resolve(string, '../', '/var.js'));
