"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("role_permission_forms", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      role_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      module_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      canCreate: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
      },
      canRead: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
      },
      canUpdate: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
      },
      canDelete: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
      },
      canApprove: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
      },
      url: { type: Sequelize.STRING },
      createBy: { type: Sequelize.STRING, allowNull: false },
      updateBy: { type: Sequelize.STRING, allowNull: false },
      isDeleted: { type: Sequelize.STRING, defaultValue: 0 },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("role_permission_forms");
  },
};
