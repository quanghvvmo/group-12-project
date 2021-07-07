'use strict';
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      employeeId: {
        type: Sequelize.STRING
      },
      managerId: {
        type: Sequelize.UUID
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      identificationNumber: {
        type: Sequelize.STRING
      },
      insuranceNumber: {
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
    await queryInterface.dropTable('users');
  }
};