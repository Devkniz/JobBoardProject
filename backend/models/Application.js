const sequelize = require('../database/config');

const { DataTypes } = require('sequelize');

const Application = sequelize.define(
    'Application',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        advertisement_id: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.ENUM(["pending", "interviewed", "rejected", "accepted"])
        },
        applied_at: {
            type: DataTypes.DATE
        },
        update_at: {
            type: DataTypes.DATE
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
        communication_id: {
            type: DataTypes.INTEGER
        }
    },
    {
        tableName: "applications",
        timestamps: false
    }
);

module.exports = Application;