const { Op } = require('Sequelize');
const { Good, Auction, User, sequelize } = require('./models');
const schedule = require('node-schedule')

module.exports = async () => {
  console.log('checkAuction');
  const t = await sequelize.transaction();
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // 어제 시간
    const targets = await Good.findAll({
      where: {
        SoldId: null,
        createdAt: { [Op.lte]: yesterday },
      },
    });
    targets.forEach(async (target) => {
      const success = await Auction.findOne({
        where: { GoodId: target.id },
        order: [['bid', 'DESC']],
        transaction: t
      });
      await Promise.all([
        Good.update({ SoldId: success.UserId }, { where: { id: good.id }, transaction: t }),
        User.update({
          money: sequelize.literal(`money - ${success.bid}`),
        }, {
          where: { id: success.UserId },
          transaction: t
        })]);
      await t.commit();
    });

    const ongoing = await Good.findAll({
      where: {
        SoldId: null,
        createdAt: { [Op.gte]: yesterday },
      },
    });
    ongoing.forEach((good) => {
      const end = new Date(good.createdAt);
      end.setDate(end.getDate() + 1);
      const job = schedule.scheduleJob(end, async () => {
        const success = await Auction.findOne({
          where: { GoodId: good.id },
          order: [['bid', 'DESC']],
          transaction: t
        })
        await good.setSold(success.UserId, {
          transaction: t
        })
        await User.update({
          money: sequelize.literal(`money - ${success.bid}`)
        }, {
          where: { id: success.UserId },
          transaction: t
        })
      })
      job.on('error', (err) => {
        console.error('스케줄링 에러', err)
      })
      job.on('success', () => {
        console.log('스케줄링 완료')
      })
    })
  } catch (error) {
    await t.rollback()
    console.error(error);
  }
};
