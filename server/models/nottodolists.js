'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notToDoList extends Model {
    
    static associate(models) {

      models.notToDoList.belongsToMany(models.users,{
        through: 'userNotToDoList',
        targetKey: 'id',
        foreignKey: 'notToDoListId',
        onDelete: 'cascade',
        onDelete: 'cascade'
      })
    }
  };
  notToDoList.init({
    notToDoListContent: DataTypes.STRING,
    checked: DataTypes.BOOLEAN,
    createAt: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'notToDoList',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  });
  return notToDoList;
};