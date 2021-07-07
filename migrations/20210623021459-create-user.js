"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      employee_code: { type: Sequelize.STRING(50), allowNull: false },
      firstname: { type: Sequelize.STRING(50), allowNull: false },
      lastname: { type: Sequelize.STRING(50), allowNull: false },
      email: {
        type: Sequelize.STRING(200),
        allowNull: false,
        validate: { isEmail: true },
      },
      phone: { type: Sequelize.INTEGER(100), allowNull: false },
      avatar: { type: Sequelize.STRING, allowNull: false },
      identification_card: { type: Sequelize.STRING(100), allowNull: false },
      social_insurance: { type: Sequelize.STRING(100), allowNull: false },
      address: { type: Sequelize.STRING(255), allowNull: false },
      department: { type: Sequelize.STRING(255), allowNull: false },
      parent: { type: Sequelize.STRING(200), allowNull: false },
      position: { type: Sequelize.STRING(100), allowNull: false },
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
    await queryInterface.dropTable("users");
  },
};
