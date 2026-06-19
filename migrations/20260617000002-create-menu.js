'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Menus', {
      Id_Menu: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      Nama_Menu: {
        type: Sequelize.STRING(50)
      },
      Harga_Menu: {
        type: Sequelize.FLOAT
      },
      Kategori_Menu: {
        type: Sequelize.ENUM('makanan', 'minuman')
      },
      Gambar_Menu: {
        type: Sequelize.STRING(255)
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
    await queryInterface.dropTable('Menus');
  }
};
