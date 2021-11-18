'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dateStorage', {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pushDate: {
        allowNull: true,
        type: Sequelize.STRING,
        unique:true
      }
    })
    .then(()=> {
      queryInterface.addColumn('userDate', 'pushDate', {
        type: Sequelize.STRING,
        allowNull: true,
        //onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {model: 'dateStorage', key:'pushDate'}
      })
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
    await queryInterface.dropTable('dateStorage');
  }
};