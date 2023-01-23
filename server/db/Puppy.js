const Sequelize = require('sequelize');
const db = require('./db');

const Puppy = db.define('puppies', {
  puppyName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Puppy;