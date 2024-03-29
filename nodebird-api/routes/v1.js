const express = require('express');
const router = express.Router();
const { verifyToken, deprecated, apiLimit } = require('../middlewares');
const { createToken, tokenTest, getUserPost, getPostByTag } = require('../controllers/v1')


router.use(apiLimit)

router.post('/token', createToken);
router.get('/test', verifyToken, tokenTest)

router.get('/post/user', verifyToken, getUserPost);
router.get('/post/hashtag/:title', verifyToken, getPostByTag)

module.exports = router