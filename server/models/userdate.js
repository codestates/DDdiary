'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class userDate extends Model {

    static associate(models) {

    }
};
userDate.init({
    pushDate:DataTypes.STRING,
    userId:DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'userDate',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    timestamps: false,
    freezeTableName: true
    });
return userDate;
};