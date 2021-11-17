'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notToDoList extends Model {

    static associate(models) {

      models.notToDoList.belongsTo(models.users, {
        foreignKey: 'userId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        //onUpdate: 'CASCADE'
      })
    }
  };
  notToDoList.init({
    notToDoListContent: DataTypes.STRING,
    checked: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    date: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'notToDoList',
    modelName: 'notToDoList',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    timestamps: false,
  });
  return notToDoList;
};