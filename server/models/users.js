'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {

    static associate(models) {
      models.users.belongsToMany(models.diarys, {
        through: 'userDiary',
        targetKey: 'id',
        foreignKey: 'userId',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
      models.users.belongsToMany(models.notToDoList, {
        through: 'userNotToDoList',
        targetKey: 'id',
        foreignKey: 'userId',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })


    }
  };
  users.init({
    email: DataTypes.STRING,
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
    socialType: DataTypes.STRING,
    manager: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'users',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  });
  return users;
};