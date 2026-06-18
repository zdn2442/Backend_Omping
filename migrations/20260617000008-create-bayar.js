'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bayars', {
      Id_Bayar: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      Tanggal_Bayar: {
        type: Sequelize.DATEONLY
      },
      Metode_Bayar: {
        type: Sequelize.ENUM('cash', 'QRIS')
      },
      Grand_Bayar: {
        type: Sequelize.FLOAT
      },
      Id_Pelanggan: {
        type: Sequelize.STRING(20),
        references: {
          model: 'Pelanggans',
          key: 'Id_pelanggan'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      Id_Karyawan: {
        type: Sequelize.STRING(20),
        references: {
          model: 'Karyawans',
          key: 'Id_Karyawan'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      Id_Pesan: {
        type: Sequelize.STRING(20),
        references: {
          model: 'Pesans',
          key: 'Id_Pesan'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bayars');
  }
};
