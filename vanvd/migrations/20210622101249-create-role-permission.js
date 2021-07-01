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
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.UUID
      },
      updateBy: {
        allowNull: false,
        type: Sequelize.UUID
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      isDelete: {
        allowNull: false,
        type: Sequelize.INTEGER
      }

    });
  },
  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('rolePermissions');
  }
};