const express = require('express')
const router = express.Router();

// const { test } = require('../controllers/test');
const { getMyPosts, searchByTag } = require('../controllers');



router.get('/', (req, res) => {
  res.render('main', {
    key: process.env.CLIENT_SECRET
  })
})
router.get('/post/my', getMyPosts)
router.get('/search/:hashtag', searchByTag)

module.exports = router