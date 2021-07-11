const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class module extends Model {
    static associate(models) {
      module.hasOne(models.rolePermission, {
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
    moduleName: DataTypes.STRING,
    createBy: DataTypes.UUID,
    updateBy: DataTypes.UUID,
    isDelete: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'module',
  });
  return module;
};