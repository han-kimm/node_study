const crypto = require('crypto')

const password = crypto.createHash('sha512').update('김하').digest('base64')

console.log(password)