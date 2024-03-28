const { Sequelize, DataTypes } = require("sequelize");


class Domain extends Sequelize.Model {
  static initiate(sequelize) {
    Domain.init({
      host: {
        type: DataTypes.STRING(80),
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('free', 'premium'),
        allowNull: false
      },
      clientSecret: {
        type: DataTypes.UUID,
        allowNull: false
      }
    }, {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: 'Domain',
      tableName: "domains"
    })
  }

  static associate(db) {
    db.Domain.belongsTo(db.User)
  }
}

module.exports = Domain