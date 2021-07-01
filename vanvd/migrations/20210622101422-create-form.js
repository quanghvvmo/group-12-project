'use strict';
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('forms', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      userId: {
        type: Sequelize.UUID
      },
      typeOf: {
        type: Sequelize.STRING
      },
      managerId: {
        type: Sequelize.UUID
      },
      note: {
        type: Sequelize.TEXT
      },
      task: {
        type: Sequelize.TEXT
      },
      achievement: {
        type: Sequelize.TEXT
      },
      managerComment: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.UUID
      },
      updateBy: {
        allowNull: false,
        type: Sequelize.UUID
      },
      isDelete: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('forms');
  }
};