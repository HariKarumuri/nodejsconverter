const { DataTypes } = require('sequelize');
const sequelize = require('../models/index').sequelize

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    employeeId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    joiningDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    picture: {
        type: DataTypes.STRING
    },
    dateTime: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'employee',
    timestamps: false 
});

module.exports = Employee;
