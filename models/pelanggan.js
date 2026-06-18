'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pelanggan extends Model {
    static associate(models) {
      Pelanggan.hasMany(models.Daftar, {
        foreignKey: 'Id_Pelanggan',
      });
      Pelanggan.hasMany(models.Pesan, {
        foreignKey: 'Id_Pelanggan',
      });
      Pelanggan.hasMany(models.Bayar, {
        foreignKey: 'Id_Pelanggan',
      });
    }
  }
  Pelanggan.init({
    Id_pelanggan: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false
    },
    Nama_Pelanggan: {
      type: DataTypes.STRING(50)
    },
    No_Hp: {
      type: DataTypes.BIGINT
    },
    Tanggal_Registrasi: {
      type: DataTypes.DATEONLY
    }
  }, {
    sequelize,
    modelName: 'Pelanggan',
    hooks: {
      beforeValidate: async (instance) => {
        if (!instance.Id_pelanggan) {
          const prefix = '99';
          const lastRecord = await Pelanggan.findOne({
            order: [['Id_pelanggan', 'DESC']]
          });
          let nextNum = 1;
          if (lastRecord) {
            const numPart = parseInt(lastRecord.Id_pelanggan.substring(prefix.length));
            if (!isNaN(numPart)) nextNum = numPart + 1;
          }
          instance.Id_pelanggan = prefix + String(nextNum).padStart(3, '0');
        }
      },
      afterCreate: async (instance) => {
        const Daftar = sequelize.models.Daftar;
        await Daftar.create({
          Id_Pelanggan: instance.Id_pelanggan,
          Tanggal_Daftar: instance.Tanggal_Registrasi || new Date().toISOString().split('T')[0]
        });
      }
    }
  });
  return Pelanggan;
};
