"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user_role, role_permission_form }) {
      // define association here
      this.hasOne(user_role, {
        foreignKey: "role_id",
      });

      this.hasMany(role_permission_form, {
        foreignKey: "role_id",
      });
    }
  }
  role.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      role_name: { type: DataTypes.STRING(200), allowNull: false },
      createBy: { type: DataTypes.STRING, allowNull: false },
      updateBy: { type: DataTypes.STRING, allowNull: false },
      isDeleted: { type: DataTypes.STRING, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: "role",
    }
  );
  return role;
};
