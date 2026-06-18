'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pesans', {
      Id_Pesan: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false
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
      Tanggal_Pesan: {
        type: Sequelize.DATEONLY
      },
      Total_Bayar: {
        type: Sequelize.FLOAT
      },
      Status_Pesan: {
        type: Sequelize.ENUM('pesanan masuk', 'diproses', 'pesanan selesai')
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
    await queryInterface.dropTable('Pesans');
  }
};
