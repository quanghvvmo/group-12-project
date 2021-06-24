const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    static associate(models) {
      account.belongsTo(models.user, {
        foreignKey: "userId"
      })
    }
  };
  account.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: DataTypes.UUID,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'account',
  });
  return account;
};