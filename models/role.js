const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    static associate(models) {
      role.hasOne(models.userRole, {
        foreignKey: "roleId"
      });
      role.hasOne(models.rolePermission, {
        foreignKey: "roleId"
      })
    }
  };
  role.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    roleName: DataTypes.STRING,
    createBy: DataTypes.UUID,
    updateBy: DataTypes.UUID,
    isDelete: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'role',
  });
  return role;
};