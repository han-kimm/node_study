const User = require('../models/user')

exports.follow = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10))
      res.send({ message: 'following success' })
    } else {
      res.status(404).send({ message: '시도하는 유저가 회원이 아닙니다.' })
    }

  } catch (e) {
    console.error(e)
    next(e)
  }
}

exports.unfollow = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (user) {
      await user.removeFollowing(parseInt(req.params.id, 10))
      res.send({ message: 'unfollowing success' })
    } else {
      res.status(404).send({ message: '시도하는 유저가 회원이 아닙니다.' })
    }
  } catch (e) {
    console.error(e);
    next(e)
  }
}