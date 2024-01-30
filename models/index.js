// models/index.js

const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig.js');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operators: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

const db = {
  sequelize,
  Sequelize,
  DataTypes
};

db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synchronization complete.');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

module.exports = db;
