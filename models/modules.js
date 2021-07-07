"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class modules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ role_permission_form }) {
      // define association here
      // define association here
      this.hasMany(role_permission_form, {
        foreignKey: "module_id",
      });
    }
  }
  modules.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      module_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      createBy: { type: DataTypes.STRING, allowNull: false },
      updateBy: { type: DataTypes.STRING, allowNull: false },
      isDeleted: { type: DataTypes.STRING, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: "modules",
    }
  );
  return modules;
};
