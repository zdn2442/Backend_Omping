'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Cari nama constraint foreign key yang merujuk ke tabel Pesans dari kolom Id_Pesan
    const [results] = await queryInterface.sequelize.query(`
      SELECT CONSTRAINT_NAME 
      FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
      WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'DetailPesans' 
        AND COLUMN_NAME = 'Id_Pesan' 
        AND REFERENCED_TABLE_NAME = 'Pesans';
    `);

    // 2. Drop constraint lama jika ditemukan
    if (results && results.length > 0) {
      for (const row of results) {
        const constraintName = row.CONSTRAINT_NAME;
        try {
          await queryInterface.removeConstraint('DetailPesans', constraintName);
          console.log(`Successfully removed constraint: ${constraintName}`);
        } catch (err) {
          console.error(`Failed to remove constraint ${constraintName}:`, err.message);
        }
      }
    }

    // 3. Tambahkan constraint baru dengan onDelete: 'CASCADE' dan name terstandarisasi
    await queryInterface.addConstraint('DetailPesans', {
      fields: ['Id_Pesan'],
      type: 'foreign key',
      name: 'DetailPesans_Id_Pesan_foreign_idx',
      references: {
        table: 'Pesans',
        field: 'Id_Pesan'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeConstraint('DetailPesans', 'DetailPesans_Id_Pesan_foreign_idx');
    } catch (err) {
      console.error('Failed to remove constraint in down:', err.message);
    }
    // Kembalikan ke constraint tanpa onDelete CASCADE
    await queryInterface.addConstraint('DetailPesans', {
      fields: ['Id_Pesan'],
      type: 'foreign key',
      references: {
        table: 'Pesans',
        field: 'Id_Pesan'
      },
      onUpdate: 'CASCADE'
    });
  }
};
