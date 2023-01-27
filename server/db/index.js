//this is the access point for all things database related!
const Sequelize = require("sequelize");
const db = require("./db");
const User = require("./models/User");
const Taskcard = require("./models/TaskCard");
const List = require("./models/List");
const Board = require("./models/Board");
const UserBoard = require("./models/UserBoard");
const UserTaskcard = require("./models/UserTaskcard");
const Event = require("./models/Event");
const EventInvite = require("./models/EventInvite");

User.belongsToMany(Board, { through: UserBoard, autosave: true });
Board.belongsTo(User, { through: UserBoard, autosave: true });
UserBoard.belongsTo(Board, { foreignKey: "boardId" });
UserBoard.belongsTo(User, { foreignKey: "userId" });
User.belongsToMany(Taskcard, { through: UserTaskcard });
Taskcard.belongsToMany(User, { through: UserTaskcard });
Taskcard.belongsTo(List);
List.belongsTo(Board);
List.hasOne(Board);
Event.belongsToMany(User, {
  through: EventInvite,
  foreignKey: "eventId",
});
User.belongsToMany(Event, {
  through: EventInvite,
  foreignKey: "userId",
});
EventInvite.belongsTo(Event, { foreignKey: "eventId" });
EventInvite.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  db,
  models: {
    User,
    Board,
    List,
    Taskcard,
    UserTaskcard,
    UserBoard,
    Event,
  },
};
