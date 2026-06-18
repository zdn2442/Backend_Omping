'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Daftars', {
      Id_Daftar: {
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
      Tanggal_Daftar: {
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
    await queryInterface.dropTable('Daftars');
  }
};
