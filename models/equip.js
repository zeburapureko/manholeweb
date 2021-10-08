'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Equip.belongsTo(models.User);
    }
  };
  Equip.init({
    userId: DataTypes.INTEGER,
    tno: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Equip',
  });
  return Equip;
};