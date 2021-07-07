const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class form extends Model {
    static associate(models) {
      form.belongsTo(models.user, {
        foreignKey: "userId"
      })
    }
  };
  form.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: DataTypes.UUID,
    typeOf: DataTypes.STRING,
    managerId: DataTypes.UUID,
    note: DataTypes.TEXT,
    task: DataTypes.TEXT,
    achievement: DataTypes.TEXT,
    managerComment: DataTypes.TEXT,
    status: DataTypes.STRING,
    createBy: DataTypes.UUID,
    updateBy: DataTypes.UUID,
    isDelete: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'form',
  });
  return form;
};