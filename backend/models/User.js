const sequelize = require('../database/config');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING(254)
        },
        last_name: {
            type: DataTypes.STRING(254)
        },
        email: {
            type: DataTypes.STRING(254)
        },
        phone: {
            type: DataTypes.STRING(254)
        },
        role: {
            type: DataTypes.STRING(254)
        },
        password: {
            type: DataTypes.STRING(254)
        }
    }, {
        tableName: 'peoples',
        timestamps: false,
    }
);

module.exports = User;