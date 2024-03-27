const User = require("../models/user")
const bcrypt = require('bcrypt')

exports.join = async (req, res, next) => {
  const { nick, email, password } = req.body

  try {
    const exUser = await User.findOne({ where: { email } })
    if (exUser) {
      return res.redirect('/join?error=exist')
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      nick,
      email,
      password: hash
    })
    return res.redirect('/')
  } catch (e) {
    console.error(e);
    next(e)
  }
}