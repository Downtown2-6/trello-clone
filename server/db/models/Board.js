const Sequelize = require('sequelize');
const db = require('../db');

const Board = db.define("board", {
  boardName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  creatorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Board;
