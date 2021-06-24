'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class module extends Model {
    static associate(models) {
      module.hasMany(models.rolePermission, {
        foreignKey: "roleId"
      })
    }
  };
  module.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    moduleName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'module',
  });
  return module;
};