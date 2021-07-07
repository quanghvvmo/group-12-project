"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user }) {
      // define association here
      this.belongsTo(user, { foreignKey: "user_id" });
    }
  }
  form.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: { type: DataTypes.STRING },
      form_type: { type: DataTypes.STRING },
      manager: { type: DataTypes.STRING },
      status: { type: DataTypes.STRING },
      personal_review: { type: DataTypes.STRING },
      manager_review: { type: DataTypes.STRING },
      hr_review: { type: DataTypes.STRING },
      task: { type: DataTypes.STRING },
      archivement: { type: DataTypes.STRING },
      createBy: { type: DataTypes.STRING, allowNull: false },
      updateBy: { type: DataTypes.STRING, allowNull: false },
      isDeleted: { type: DataTypes.STRING, defaultValue: 0 },
    },

    {
      sequelize,
      modelName: "form",
    }
  );
  return form;
};
