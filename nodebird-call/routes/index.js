const express = require('express')
const router = express.Router();

// const { test } = require('../controllers/test');
const { getMyPosts, searchByTag } = require('../controllers');

router.get('/', (req, res) => {
  res.send("<h1>Nodebirds API 이용하기</h1> <a href='/post/my'>내 글 불러오기</a> <a href='/search/인간'>'인간' 해시태그로 검색하기</a>")
})
router.get('/post/my', getMyPosts)
router.get('/search/:hashtag', searchByTag)

module.exports = router