'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING
      },
      nickname: {
        allowNullL: false,
        type: Sequelize.STRING
      },
      socialType: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'basic'
      },
      manager: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(
      () => {
        queryInterface.addColumn('userDiary', 'userId', {
          type: Sequelize.INTEGER,
          allowNull: true,
          onDelete: 'CASCADE',
          references: {model: 'users', key:'id'}
        })
      }
    )
    .then(
      () => {
        queryInterface.addColumn('userNotToDolist', 'userId', {
          type: Sequelize.INTEGER,
          allowNull: true,
          onDelete: 'CASCADE',
          references: {model: 'users', key:'id'}
        })
      }  
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};