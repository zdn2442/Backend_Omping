'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailPesan extends Model {
    static associate(models) {
      DetailPesan.belongsTo(models.Pesan, {
        foreignKey: 'Id_Pesan',
        onDelete: 'CASCADE',
      });
      DetailPesan.belongsTo(models.Menu, {
        foreignKey: 'Id_Menu',
      });
    }
  }
  DetailPesan.init({
    Id_Pesan: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Pesans',
        key: 'Id_Pesan',
      }
    },
    Id_Menu: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Menus',
        key: 'Id_Menu',
      }
    },
    Qty: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'DetailPesan',
  });
  return DetailPesan;
};
