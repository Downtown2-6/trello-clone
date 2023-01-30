//this is the access point for all things database related!
const Sequelize = require("sequelize");
const db = require("./db");
const User = require("./models/User");
const TaskCard = require("./models/TaskCard");
const List = require("./models/List");
const Board = require("./models/Board");
const UserBoard = require("./models/UserBoard");
const UserTaskCard = require("./models/UserTaskCard");

User.belongsToMany(Board, { through: UserBoard, autosave: true });
Board.belongsTo(User, { through: UserBoard, autosave: true });
UserBoard.belongsTo(Board, { foreignKey: "boardId" });
UserBoard.belongsTo(User, { foreignKey: "userId" });
User.belongsToMany(TaskCard, { through: UserTaskCard });
List.hasMany(TaskCard);
TaskCard.belongsTo(List);
TaskCard.belongsToMany(User, { through: UserTaskCard });
Board.hasMany(List);
Board.belongsToMany(User, { through: UserBoard })
List.belongsTo(Board);
Board.hasMany(TaskCard)
TaskCard.belongsTo(Board)

module.exports = {
  db,
  models: {
    User,
    Board,
    List,
    TaskCard,
    UserTaskCard,
    UserBoard,
    Event,
  },
};
