const Sequelize = require("sequelize");
const db = require("../db");

const UserBoard = db.define("userboard", {
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
