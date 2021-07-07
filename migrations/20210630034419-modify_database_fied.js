"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("users", "createBy", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("users", "updateBy", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("users", "isDeleted", {
        type: Sequelize.STRING,
        defaultValue: 0,
      }),
      queryInterface.addColumn("accounts", "createBy", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("accounts", "updateBy", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("accounts", "isDeleted", {
        type: Sequelize.STRING,
        defaultValue: 0,
      }),
      queryInterface.addColumn("forms", "createBy", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("forms", "updateBy", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("forms", "isDeleted", {
        type: Sequelize.STRING,
        defaultValue: 0,
      }),
      queryInterface.addColumn("modules", "createBy", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("modules", "updateBy", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("modules", "isDeleted", {
        type: Sequelize.STRING,
        defaultValue: 0,
      }),
      queryInterface.addColumn("role_permission_forms", "url", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn("role_permission_forms", "createBy", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("role_permission_forms", "updateBy", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("role_permission_forms", "isDeleted", {
        type: Sequelize.STRING,
        defaultValue: 0,
      }),
      queryInterface.addColumn("roles", "createBy", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("roles", "updateBy", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("roles", "isDeleted", {
        type: Sequelize.STRING,
        defaultValue: 0,
      }),
      queryInterface.addColumn("user_roles", "createBy", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("user_roles", "updateBy", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("user_roles", "isDeleted", {
        type: Sequelize.STRING,
        defaultValue: 0,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
