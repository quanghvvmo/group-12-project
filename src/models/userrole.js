const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userRole extends Model {
    static associate(models) {
      userRole.belongsTo(models.user, {
        foreignKey: "userId"
      });
      userRole.belongsTo(models.role, {
        foreignKey: "roleId"
      })
    }
  };
  userRole.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: DataTypes.UUID,
    roleId: DataTypes.UUID,
    createBy: DataTypes.UUID,
    updateBy: DataTypes.UUID,
    isDelete: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userRole',
  });
  return userRole;
};