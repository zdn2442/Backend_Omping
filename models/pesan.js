'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pesan extends Model {
    static associate(models) {
      Pesan.belongsTo(models.Pelanggan, {
        foreignKey: 'Id_Pelanggan',
        targetKey: 'Id_pelanggan',
      });
      Pesan.hasMany(models.DetailPesan, {
        foreignKey: 'Id_Pesan',
        onDelete: 'CASCADE',
        hooks: true
      });
      Pesan.hasOne(models.Bayar, {
        foreignKey: 'Id_Pesan',
      });
    }
  }
  Pesan.init({
    Id_Pesan: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false
    },
    Id_Pelanggan: {
      type: DataTypes.STRING(20)
    },
    Tanggal_Pesan: {
      type: DataTypes.DATEONLY
    },
    Total_Bayar: {
      type: DataTypes.FLOAT
    },
    Status_Pesan: {
      type: DataTypes.ENUM('diproses', 'pesanan selesai')
    }
  }, {
    sequelize,
    modelName: 'Pesan',
    hooks: {
      beforeValidate: async (instance) => {
        if (!instance.Id_Pesan) {
          const prefix = '55';
          const lastRecord = await Pesan.findOne({
            order: [['Id_Pesan', 'DESC']]
          });
          let nextNum = 1;
          if (lastRecord) {
            const numPart = parseInt(lastRecord.Id_Pesan.substring(prefix.length));
            if (!isNaN(numPart)) nextNum = numPart + 1;
          }
          instance.Id_Pesan = prefix + String(nextNum).padStart(3, '0');
        }
      }
    }
  });
  return Pesan;
};