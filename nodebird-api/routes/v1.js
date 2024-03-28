const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares');
const { createToken, tokenTest } = require('../controllers/v1')

router.post('/token', createToken);
router.get('/test', verifyToken, tokenTest)

module.exports = router