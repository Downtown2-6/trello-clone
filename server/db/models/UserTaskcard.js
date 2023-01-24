const Sequelize = require("sequelize");
const db = require("../db");

const UserTaskcard = db.define("usertaskcard", {
  taskcardId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = UserTaskcard;
