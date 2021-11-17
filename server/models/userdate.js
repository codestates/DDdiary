'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class userDate extends Model {

    static associate(models) {
    models.userDate.hasMany(models.diarys, {
        foreignKey: 'userId',
        sourceKey: 'userId',
        //onUpdate: 'cascade',
        onDelete: 'CASCADE'
    });
    models.userDate.hasMany(models.notToDoList, {
        foreignKey: 'userId',
        sourceKey: 'userId',
        //onUpdate: 'cascade',
        onDelete: 'CASCADE'
    });
    }
};
userDate.init({
    pushDate:DataTypes.INTEGER,
    userId:DataTypes.STRING
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