const Sequelize = require('sequelize');
const pkg = require('../../package.json');
// const { Client } = require('pg');

const databaseName = pkg.name + '_db' + (process.env.NODE_ENV === 'test' ? '-test' : '');

const config = {
  logging: false // unless you like the logs
};

if(process.env.LOGGING === 'true'){
  delete config.logging 
};

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if(process.env.DATABASE_URL){
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
};

const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, config);

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

module.exports = db;