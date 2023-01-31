const Sequelize = require("sequelize");
const db = require("../db");

const TaskCard = db.define("taskcard", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  start: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  end: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  position: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = TaskCard;
