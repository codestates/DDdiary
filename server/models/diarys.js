'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class diarys extends Model {

    static associate(models) {

      models.diarys.belongsToMany(models.users, {
        through: 'userDiary',
        targetKey: 'id',
        foreignKey: 'diaryId',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    }
  };
  diarys.init({
    content: DataTypes.STRING,
    createAt: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'diarys',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  });
  return diarys;
};