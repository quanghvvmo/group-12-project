const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasMany(models.userRole, {
        foreignKey: "userId"
      })
      user.hasOne(models.account, {
        foreignKey: "userId"
      });
      user.hasMany(models.form, {
        foreignKey: "userId"
      })
    }
  };
  user.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    employeeId: DataTypes.STRING,
    managerId: DataTypes.UUID,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    avatar: DataTypes.STRING,
    department: DataTypes.STRING,
    identificationNumber: DataTypes.STRING,
    insuranceNumber: DataTypes.STRING,
    createBy: DataTypes.UUID,
    updateBy: DataTypes.UUID,
    isDelete: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};