const sequelize = require('../database/config');
const { DataTypes } = require('sequelize');

const ApplicationCommunication = sequelize.define(
    'ApplicationCommunication',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email_subject: {
            type: DataTypes.TEXT('long')
        },
        email_body: {
            type: DataTypes.TEXT('long')
        },
        sent_at: {
            type: DataTypes.DATE
        }
    }, {
        tableName: "application_communications",
        timestamps: false
    }
);

module.exports = ApplicationCommunication;