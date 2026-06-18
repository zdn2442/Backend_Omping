'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Karyawan extends Model {
    static associate(models) {
      Karyawan.belongsTo(models.User, {
        foreignKey: 'Id_User',
      });
      Karyawan.hasMany(models.Bayar, {
        foreignKey: 'Id_Karyawan',
      });
    }
  }
  Karyawan.init({
    Id_Karyawan: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false
    },
    Id_User: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Nama_Karyawan: {
      type: DataTypes.STRING(50)
    },
    Posisi_Karyawan: {
      type: DataTypes.STRING(20)
    },
    No_Hp_Karyawan: {
      type: DataTypes.BIGINT
    }
  }, {
    sequelize,
    modelName: 'Karyawan',
    hooks: {
      beforeValidate: async (instance) => {
        if (!instance.Id_Karyawan) {
          const prefix = '22';
          const lastRecord = await Karyawan.findOne({
            order: [['Id_Karyawan', 'DESC']]
          });
          let nextNum = 1;
          if (lastRecord) {
            const numPart = parseInt(lastRecord.Id_Karyawan.substring(prefix.length));
            if (!isNaN(numPart)) nextNum = numPart + 1;
          }
          instance.Id_Karyawan = prefix + String(nextNum).padStart(3, '0');
        }
      }
    }
  });
  return Karyawan;
};