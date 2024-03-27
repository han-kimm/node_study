const User = require("../models/user")
const bcrypt = require('bcrypt')
const passport = require('passport')

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

exports.login = (req, res, next) => {
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) {
      console.error(authErr)
      next(authErr)
      return
    }
    if (!user) {
      res.redirect(`/?loginError=${info.message}`)
      return
    }

    return req.login(user, (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        next(loginErr)
        return
      }
      return res.redirect('/')
    })
  })(req, res, next)
}

exports.logout = (req, res, next) => {
  req.session.destroy();
  req.logout(() => {
    res.redirect('/')
  })
}