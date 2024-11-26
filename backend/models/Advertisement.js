const sequelize = require('../database/config');
const { DataTypes } =  require('sequelize');

const Advertisement = sequelize.define(
    'Advertisement',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(254),
        },
        resume: {
            type: DataTypes.TEXT('long')
        },
        description: {
            type: DataTypes.TEXT('long'),
        },
        company_id: {
            type: DataTypes.INTEGER,
        },
        wage: {
            type: DataTypes.FLOAT
        },
        place: {
            type: DataTypes.STRING(254),
        },
        working_time: {
            type: DataTypes.TEXT('long'),
        },
        applications_count: {
            type: DataTypes.INTEGER,
        }
    }, {
        tableName: 'advertisements',
        timestamps: false,
    }
);

module.exports = Advertisement;

