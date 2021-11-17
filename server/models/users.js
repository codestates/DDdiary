'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {

    static associate(models) {
      models.users.belongsToMany(models.dateStorage, {
        through: 'userDate',
        sourceKey: 'id',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        //onUpdate: 'CASCADE'
      });
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