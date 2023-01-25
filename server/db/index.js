//this is the access point for all things database related!
const Sequelize = require("sequelize");
const db = require("./db");
const User = require("./models/User");
const Taskcard = require("./models/TaskCard");
const List = require("./models/List");
const Board = require("./models/Board");
const UserBoard = require("./models/UserBoard");
const UserTaskcard = require("./models/UserTaskcard");

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
