const Sequelize = require("sequelize");
const db = require("../db");

// --------------------------
//#region FOR MONDAY REVIEW
// --------------------------
// James was interested in knowing why the SQLEctron table for this has 'userId' and listId'.
// I am too, tbh; the theory was that it has something to do with the association.
//#endregion FOR MONDAY REVIEW

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
  isArchived: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Board;
