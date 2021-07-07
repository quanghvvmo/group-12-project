"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("modules", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      module_name: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      createBy: { type: Sequelize.STRING, allowNull: false },
      updateBy: { type: Sequelize.STRING, allowNull: false },
      isDeleted: { type: Sequelize.STRING, defaultValue: 0 },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaltValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaltValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("modules");
  },
};
