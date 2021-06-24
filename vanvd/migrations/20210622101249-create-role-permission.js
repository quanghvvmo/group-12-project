'use strict';
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('rolePermissions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      roleId: {
        type: Sequelize.UUID
      },
      moduleId: {
        type: Sequelize.UUID
      },
      canRead: {
        type: Sequelize.INTEGER
      },
      canWrite: {
        type: Sequelize.INTEGER
      },
      canUpdate: {
        type: Sequelize.INTEGER
      },
      canDelete: {
        type: Sequelize.INTEGER
      },
      canApprove: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('rolePermissions');
  }
};