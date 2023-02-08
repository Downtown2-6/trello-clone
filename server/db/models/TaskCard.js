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
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  position: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: '',
  },
  editable: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    validate: {
      notEmpty: true,
    },
  },
      allDay: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = TaskCard;
