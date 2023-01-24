const Sequelize = require('sequelize');
const db = require('../db');

const List = db.define("list", {
  listName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  position: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = List;
