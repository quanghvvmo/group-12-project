"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user_role, account, form }) {
      // define association here
      this.hasMany(user_role, {
        foreignKey: "user_id",
      });

      this.hasOne(account, {
        foreignKey: "user_id",
      });

      this.hasMany(form, {
        foreignKey: "user_id",
      });
    }
  }
  user.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      employee_code: { type: DataTypes.STRING(50), allowNull: false },
      firstname: { type: DataTypes.STRING(50), allowNull: false },
      lastname: { type: DataTypes.STRING(50), allowNull: false },
      email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: { isEmail: true },
      },
      phone: { type: DataTypes.INTEGER(100), allowNull: false },
      avatar: { type: DataTypes.STRING, allowNull: false },
      identification_card: { type: DataTypes.STRING(100), allowNull: false },
      social_insurance: { type: DataTypes.STRING(100), allowNull: false },
      address: { type: DataTypes.STRING(255), allowNull: false },
      department: { type: DataTypes.STRING(255), allowNull: false },
      parent: { type: DataTypes.STRING(200), allowNull: false },
      position: { type: DataTypes.STRING(100), allowNull: false },
      createBy: { type: DataTypes.STRING, allowNull: false },
      updateBy: { type: DataTypes.STRING, allowNull: false },
      isDeleted: { type: DataTypes.STRING, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
