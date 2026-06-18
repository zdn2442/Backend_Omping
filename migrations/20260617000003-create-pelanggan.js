'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pelanggans', {
      Id_pelanggan: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      Nama_Pelanggan: {
        type: Sequelize.STRING(50)
      },
      No_Hp: {
        type: Sequelize.BIGINT
      },
      Tanggal_Registrasi: {
        type: Sequelize.DATEONLY
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
    await queryInterface.dropTable('Pelanggans');
  }
};
