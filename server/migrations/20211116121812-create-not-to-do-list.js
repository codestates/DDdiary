'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notToDoLists', {
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
      createAt: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    })
    .then(
      () => {
        queryInterface.addColumn('userNotToDolist','notToDoListId', {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {model: 'notToDoLists', key: 'id'}
        })
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('notToDoLists');
  }
};