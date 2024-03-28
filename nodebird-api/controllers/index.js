const User = require('../models/user');
const Domain = require('../models/domain');
const { v4: uuidv4 } = require('uuid')

exports.renderLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user?.id || null }, include: { model: Domain } })
    console.log(user);
    res.render('login', {
      user,
      domains: user?.Domains
    })
  } catch (e) {
    console.error(e);
    next(e)
  }
};
exports.createDomain = async (req, res, next) => {
  try {
    await Domain.create({
      UserId: req.user.id,
      host: req.body.host,
      type: req.body.type,
      clientSecret: uuidv4()
    })
    res.redirect('/')
  } catch (e) {
    console.error(e);
    next(e)
  }
};
