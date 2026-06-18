'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bayar extends Model {
    static associate(models) {
      Bayar.belongsTo(models.Pelanggan, {
        foreignKey: 'Id_Pelanggan',
        targetKey: 'Id_pelanggan',
      });
      Bayar.belongsTo(models.Karyawan, {
        foreignKey: 'Id_Karyawan',
      });
      Bayar.belongsTo(models.Pesan, {
        foreignKey: 'Id_Pesan',
      });
    }
  }
  Bayar.init({
    Id_Bayar: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false
    },
    Tanggal_Bayar: {
      type: DataTypes.DATEONLY
    },
    Metode_Bayar: {
      type: DataTypes.ENUM('cash', 'QRIS')
    },
    Grand_Bayar: {
      type: DataTypes.FLOAT
    },
    Id_Pelanggan: {
      type: DataTypes.STRING(20)
    },
    Id_Karyawan: {
      type: DataTypes.STRING(20)
    },
    Id_Pesan: {
      type: DataTypes.STRING(20)
    }
  }, {
    sequelize,
    modelName: 'Bayar',
    hooks: {
      beforeValidate: async (instance) => {
        if (!instance.Id_Bayar) {
          const prefix = '66';
          const lastRecord = await Bayar.findOne({
            order: [['Id_Bayar', 'DESC']]
          });
          let nextNum = 1;
          if (lastRecord) {
            const numPart = parseInt(lastRecord.Id_Bayar.substring(prefix.length));
            if (!isNaN(numPart)) nextNum = numPart + 1;
          }
          instance.Id_Bayar = prefix + String(nextNum).padStart(3, '0');
        }
      }
    }
  });
  return Bayar;
};