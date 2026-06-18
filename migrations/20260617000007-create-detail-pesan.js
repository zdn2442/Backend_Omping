'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetailPesans', {
      Id_Pesan: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Pesans',
          key: 'Id_Pesan'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Id_Menu: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Menus',
          key: 'Id_Menu'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Qty: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('DetailPesans');
  }
};
