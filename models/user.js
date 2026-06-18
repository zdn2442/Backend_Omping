'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Karyawan, {
        foreignKey: 'Id_User',
      });
    }
  }
  User.init({
    Id_User: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false
    },
    Nama_User: {
      type: DataTypes.STRING(50)
    },
    Password: {
      type: DataTypes.STRING(50)
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeValidate: async (instance) => {
        if (!instance.Id_User) {
          const prefix = '11';
          const lastRecord = await User.findOne({
            order: [['Id_User', 'DESC']]
          });
          let nextNum = 1;
          if (lastRecord) {
            const numPart = parseInt(lastRecord.Id_User.substring(prefix.length));
            if (!isNaN(numPart)) nextNum = numPart + 1;
          }
          instance.Id_User = prefix + String(nextNum).padStart(3, '0');
        }
      }
    }
  });
  return User;
};
