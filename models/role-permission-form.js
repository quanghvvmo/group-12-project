"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class role_permission_form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ role, modules }) {
      // define association here
      this.belongsTo(role, {
        foreignKey: "role_id",
      });

      this.belongsTo(modules, {
        foreignKey: "module_id",
      });
    }
  }
  role_permission_form.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      role_id: { type: DataTypes.STRING, allowNull: false },
      module_id: { type: DataTypes.STRING, allowNull: false },
      canCreate: { type: DataTypes.INTEGER(1), allowNull: false },
      canRead: { type: DataTypes.INTEGER(1), allowNull: false },
      canUpdate: { type: DataTypes.INTEGER(1), allowNull: false },
      canDelete: { type: DataTypes.INTEGER(1), allowNull: false },
      canApprove: { type: DataTypes.INTEGER(1), allowNull: false },
      url: { type: DataTypes.STRING },
      createBy: { type: DataTypes.STRING, allowNull: false },
      updateBy: { type: DataTypes.STRING, allowNull: false },
      isDeleted: { type: DataTypes.STRING, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: "role_permission_form",
    }
  );
  return role_permission_form;
};
