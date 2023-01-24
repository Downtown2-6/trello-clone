//this is the access point for all things database related!
const Sequelize = require("sequelize");
const db = require("./db");
const User = require("./User");
const Taskcard = require("./Taskcard");
const List = require("./List");
const Board = require("./Board");
const UserBoard = require("./UserBoard");
const UserTaskcard = require("./UserTaskcard");

User.belongsToMany(Board, { through: UserBoard });
User.belongsToMany(Taskcard, { through: UserTaskcard });
Taskcard.belongsToMany(User, { through: UserTaskcard });
Taskcard.belongsTo(List);
List.belongsTo(Board);
List.hasOne(Board);

module.exports = {
  db,
  models: {
    User,
    Board,
    List,
    Taskcard,
    UserTaskcard,
    UserBoard,
  },
};
