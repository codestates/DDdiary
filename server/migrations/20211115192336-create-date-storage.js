'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dateStorage', {
      id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      pushDate: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique:true
      }
    })
    .then(()=> {
      queryInterface.addColumn('userDate', 'pushDate', {
        type: Sequelize.INTEGER,
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