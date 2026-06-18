'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate(models) {
      Menu.hasMany(models.DetailPesan, {
        foreignKey: 'Id_Menu',
      });
    }
  }
  Menu.init({
    Id_Menu: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false
    },
    Nama_Menu: {
      type: DataTypes.STRING(50)
    },
    Harga_Menu: {
      type: DataTypes.FLOAT
    },
    Kategori_Menu: {
      type: DataTypes.ENUM('makanan', 'minuman')
    }
  }, {
    sequelize,
    modelName: 'Menu',
    hooks: {
      beforeValidate: async (instance) => {
        if (!instance.Id_Menu) {
          const prefix = '44';
          const lastRecord = await Menu.findOne({
            order: [['Id_Menu', 'DESC']]
          });
          let nextNum = 1;
          if (lastRecord) {
            const numPart = parseInt(lastRecord.Id_Menu.substring(prefix.length));
            if (!isNaN(numPart)) nextNum = numPart + 1;
          }
          instance.Id_Menu = prefix + String(nextNum).padStart(3, '0');
        }
      }
    }
  });
  return Menu;
};
