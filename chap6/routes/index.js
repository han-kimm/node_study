const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(0)
  next()
  // return res.send("Hello, Router")
})

module.exports = router;