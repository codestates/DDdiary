'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dateStorage extends Model {

    static associate(models) {
      models.dateStorage.belongsToMany(models.users, {
        through: 'userDate',
        sourceKey: 'pushDate',
        foreignKey: 'pushDates',
        onDelete: 'CASCADE',
        //onUpdate: 'CASCADE'
      })
    }
  };
  dateStorage.init({
    pushDate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'dateStorage',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    timestamps:false,
    freezeTableName: true
  });
  return dateStorage;
};