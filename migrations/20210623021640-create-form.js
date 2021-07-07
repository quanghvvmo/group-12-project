"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("forms", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.STRING,
      },
      form_type: {
        type: Sequelize.STRING,
      },
      manager: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      personal_review: {
        type: Sequelize.STRING,
      },
      manager_review: {
        type: Sequelize.STRING,
      },
      hr_review: {
        type: Sequelize.STRING,
      },
      task: {
        type: Sequelize.STRING,
      },
      archivement: {
        type: Sequelize.STRING,
      },
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
    await queryInterface.dropTable("forms");
  },
};
