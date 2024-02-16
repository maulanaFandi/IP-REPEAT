'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Transaction.belongsTo(models.User, { foreignKey: "UserId" })
      // define association here
    }
  }
  Transaction.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "UserId is required"
        },
        notEmpty: {
          msg: "UserId is required"
        },
      },
    },
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Transaction_id is required",
        },
        notEmpty: {
          msg: "Transaction_id is required",
        },
      },
    },
    payment_gateway_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Payment_gateway_id is required",
        },
        notEmpty: {
          msg: "Payment_gateway_id is required",
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "PENDING"
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};