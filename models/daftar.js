'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Daftar extends Model {
    static associate(models) {
      Daftar.belongsTo(models.Pelanggan, {
        foreignKey: 'Id_Pelanggan',
        targetKey: 'Id_pelanggan',
      });
    }
  }
  Daftar.init({
    Id_Daftar: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false
    },
    Id_Pelanggan: {
      type: DataTypes.STRING(20)
    },
    Tanggal_Daftar: {
      type: DataTypes.DATEONLY
    }
  }, {
    sequelize,
    modelName: 'Daftar',
    hooks: {
      beforeValidate: async (instance) => {
        if (!instance.Id_Daftar) {
          const prefix = '33';
          const lastRecord = await Daftar.findOne({
            order: [['Id_Daftar', 'DESC']]
          });
          let nextNum = 1;
          if (lastRecord) {
            const numPart = parseInt(lastRecord.Id_Daftar.substring(prefix.length));
            if (!isNaN(numPart)) nextNum = numPart + 1;
          }
          instance.Id_Daftar = prefix + String(nextNum).padStart(3, '0');
        }
      }
    }
  });
  return Daftar;
};
