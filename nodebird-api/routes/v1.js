const express = require('express');
const router = express.Router();
const { verifyToken, deprecated, apiLimit, customCors } = require('../middlewares');
const { createToken, tokenTest, getUserPost, getPostByTag } = require('../controllers/v1')

router.use(customCors)

router.post('/token', createToken);
router.get('/test', verifyToken, tokenTest)

router.get('/post/user', verifyToken, getUserPost);
router.get('/post/hashtag/:title', verifyToken, getPostByTag)

module.exports = router