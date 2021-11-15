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
      createAt: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    })
    .then(()=> {
      queryInterface.addColumn('userDiary','diaryId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
        references: { model: 'diarys', key: 'id' }
      })
    }
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('diarys');
  }
};