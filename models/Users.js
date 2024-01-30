const { Model, DataTypes } = require('sequelize');
const sequelize = require('../models/index').sequelize; // Use sequelize directly

class User extends Model {}

User.init(
  {
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize, // Pass the sequelize instance explicitly
    modelName: 'User',
  }
);

module.exports = User;
