'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Karyawans', {
      Id_Karyawan: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      Id_User: {
        type: Sequelize.STRING(20),
        allowNull: false,
        references: {
          model: 'Users',
          key: 'Id_User'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Nama_Karyawan: {
        type: Sequelize.STRING(50)
      },
      Posisi_Karyawan: {
        type: Sequelize.STRING(20)
      },
      No_Hp_Karyawan: {
        type: Sequelize.BIGINT
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
    await queryInterface.dropTable('Karyawans');
  }
};
