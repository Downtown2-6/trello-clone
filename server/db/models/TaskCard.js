const Sequelize = require("sequelize");
const db = require("../db");

const TaskCard = db.define("taskcard", {
  taskcardName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  position: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = TaskCard;
