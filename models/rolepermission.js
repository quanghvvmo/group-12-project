const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rolePermission extends Model {
    static associate(models) {
      rolePermission.belongsTo(models.role, {
        foreignKey: "roleId"
      });
      rolePermission.belongsTo(models.module, {
        foreignKey: "moduleId"
      })
    }
  };
  rolePermission.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    roleId: DataTypes.UUID,
    moduleId: DataTypes.UUID,
    canRead: DataTypes.INTEGER,
    canWrite: DataTypes.INTEGER,
    canUpdate: DataTypes.INTEGER,
    canDelete: DataTypes.INTEGER,
    canApprove: DataTypes.INTEGER,
    createBy: DataTypes.UUID,
    updateBy: DataTypes.UUID,
    isDelete: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'rolePermission',
  });
  return rolePermission;
};