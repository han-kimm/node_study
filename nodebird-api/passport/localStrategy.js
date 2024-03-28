const passport = require("passport")
const { Strategy: LocalStrategy } = require('passport-local')
const User = require("../models/user")
const bcrypt = require('bcrypt')

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false
  }, async (email, password, done) => {
    try {
      const exUser = await User.findOne({ where: { email } });
      if (exUser) {
        const isCorrect = await bcrypt.compare(password, exUser.password);
        if (isCorrect) {
          done(null, exUser)
          return
        }

        done(null, false, { message: "비밀번호가 일치하지 않습니다." })
        return
      }

      done(null, false, { message: "가입되지 않은 회원입니다." })
    } catch (e) {
      console.error(e)
      done(e);
    }
  }))
}