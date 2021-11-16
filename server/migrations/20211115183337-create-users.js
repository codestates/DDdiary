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
        queryInterface.addColumn('userDate', 'userId', {
          type: Sequelize.INTEGER,
          allowNull: true,
          //onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: {model: 'users', key:'id'}
        })
      }
    )
  },
  down: async (queryInterface, Sequelize) => {
    let sql ='SET FOREIGN_KEY_CHECKS = 0';
    const foreignKey = ()=> {
      return queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.RAW,
      })
    }
    await foreignKey()
    await queryInterface.dropTable('users');
  }
};