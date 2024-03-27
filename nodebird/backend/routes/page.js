const express = require('express');
const router = express.Router();

router.get('/profile', (req, res, next) => {
  res.send({ title: '내 정보 - NodeBird' })
})
router.get('/join', (req, res, next) => {
  res.send({ title: '회원 가입 - NodeBird' })
})
router.get('/', (req, res, next) => {
  res.send({ title: 'NodeBird', twits: [] })
})

module.exports = router