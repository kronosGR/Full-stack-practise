const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const CartItem = sequelize.define('CartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER
});

module.exports = CartItem;
