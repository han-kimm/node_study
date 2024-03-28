const Domain = require('../models/domain')
const User = require('../models/user')
const Post = require('../models/post')
const Hashtag = require('../models/hashtag')
const jwt = require('jsonwebtoken')

exports.createToken = async (req, res) => {
  const { clientSecret } = req.body;
  try {
    const domain = await Domain.findOne({
      where: { clientSecret },
      include: [{
        model: User,
        attributes: ['id', 'nick']
      }]
    })

    if (!domain) {
      return res.status(401).json({
        code: 401,
        message: "등록되지 않은 도메인입니다. 등록을 먼저 해주세요"
      })
    }
    const token = jwt.sign({
      id: domain.User.id,
      nick: domain.User.nick
    }, process.env.JWT_SECRET, {
      expiresIn: "1m",
      issuer: 'nodebird'
    })

    return res.json({
      code: 200,
      message: '토큰 발급 완료',
      token
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      code: 500,
      message: "서버 에러"
    })
  }

}
exports.tokenTest = async (req, res) => {
  res.json(res.locals.decoded)
}

exports.getUserPost = (req, res) => {
  Post.findAll({ where: { userId: res.locals.decoded.id } })
    .then((posts) => {
      res.json({
        code: 200,
        payload: posts,
      })
    })
    .catch((err) => {
      return res.status(500).json({
        code: 500,
        message: '서버 에러'
      })
    })

}

exports.getPostByTag = async (req, res) => {
  try {
    const hashtag = await Hashtag.findOne({ where: { title: req.params.title } });
    if (!hashtag) {
      return res.status(404).json({
        code: 404,
        message: '검색 결과가 없습니다.'
      })
    }
    const posts = await hashtag.getPosts()
    return res.json({
      code: 200,
      payload: posts
    })
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      code: 500,
      message: '서버 에러'
    })
  }
}