'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notToDoList', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      notToDoListContent: {
        allowNull:false,
        type: Sequelize.STRING,
      },
      checked: {
        allowNull: false,        
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      date: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    })
    .then(function () {
      queryInterface.addColumn('notToDoList', 'userId', {
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
    await queryInterface.dropTable('notToDoList');
  }
};