'use strict';
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      userId: {
        type: Sequelize.UUID
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
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
    await queryInterface.dropTable('accounts');
  }
};