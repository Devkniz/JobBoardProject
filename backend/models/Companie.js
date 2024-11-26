const { DESCRIBE } = require('sequelize/lib/query-types');
const sequelize = require('../database/config');
const {DataTypes} = require('sequelize');

const Companie = sequelize.define(
    'Companie',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(254)
        },
        description: {
            type: DataTypes.TEXT('long')
        }
    }, {
        tableName: 'companies',
        timestamps: false,
    }
);

module.exports = Companie;