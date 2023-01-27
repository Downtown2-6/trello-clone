const Sequelize = require("sequelize");
const db = require("../db");

const EventInvite = db.define("eventinvite", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  eventId: {
    type: Sequelize.INTEGER,
    references: {
      model: "Event",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "User",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  status: {
    type: Sequelize.STRING,
    status: {
      type: Sequelize.ENUM("accepted", "pending", "rejected"),
      defaultValue: "pending",
    },
  },
});

module.exports = EventInvite;
