'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class diarys extends Model {

    static associate(models) {

      models.diarys.belongsTo(models.userDate, {
        foreignKey: 'userId',
        //as: 'userDate',
        sourceKey: 'userId',
        onDelete: 'CASCADE',
        //onUpdate: 'CASCADE'
      })
    }
  };
  diarys.init({
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'diarys',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    timestamps: false
  });
  return diarys;
};