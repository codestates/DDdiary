'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('diarys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      date: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    })
    .then(function () {
      queryInterface.addColumn('diarys', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' },
      });
    })
  },
  down: async (queryInterface, Sequelize) => {
    let sql ='SET FOREIGN_KEY_CHECKS = 0';
    const foreignKey = ()=> {
      return queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.RAW,
      })
    }
    await foreignKey()
    await queryInterface.dropTable('diarys');
  }
};