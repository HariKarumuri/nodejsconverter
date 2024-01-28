const { DataTypes } = require('sequelize');
const sequelize = require('../models/index').sequelize

const Asset = sequelize.define('Asset', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    assetName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    assetId: {
        type: DataTypes.STRING,
    },
    purchaseDate: {
        type: DataTypes.DATE,
    },
    purchaseFrom: {
        type: DataTypes.STRING,
    },
    manufacturer: {
        type: DataTypes.STRING,
    },
    model: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.INTEGER,
    },
    supplier: {
        type: DataTypes.STRING,
    },
    assetCondition: {
        type: DataTypes.STRING,
    },
    warranty: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.INTEGER,
    },
    assetUser: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    dateTime: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'assets', 
});

module.exports = Asset;
