const Sequelize = require("sequelize");
const db = require("../db");

const UserBoard = db.define("userboard", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  boardId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  privilege: {
    type: Sequelize.STRING,
    status: {
      type: Sequelize.ENUM("ADMIN", "USER"),
      defaultValue: "USER",
    },
    allowNull: false,
  },
});

module.exports = UserBoard;
