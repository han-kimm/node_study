const Domain = require('../models/domain')
const User = require('../models/user')
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