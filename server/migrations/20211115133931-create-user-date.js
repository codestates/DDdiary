'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userDate', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    let sql ='SET FOREIGN_KEY_CHECKS = 0';
    const foreignKey = ()=> {
      return queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.RAW,
      })
    }
    await foreignKey()
    await queryInterface.dropTable('userDate');
  }
};