'use strict';
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('modules', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      moduleName: {
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
    await queryInterface.dropTable('modules');
  }
};