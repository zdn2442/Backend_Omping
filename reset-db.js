const env = process.env.NODE_ENV || 'development';
if (env !== 'production') {
  require('dotenv').config({ path: `.env.${env}` });
}

const { Sequelize } = require('sequelize');
const seq = new Sequelize({
  dialect: process.env.DB_DIALECT || 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false
});

(async () => {
  try {
    await seq.authenticate();
    console.log('Koneksi berhasil!\n');

    await seq.query('SET FOREIGN_KEY_CHECKS = 0');

    const [tables] = await seq.query("SHOW TABLES");
    const tableKey = Object.keys(tables[0] || {})[0];

    if (tables.length === 0) {
      console.log('Database sudah kosong.');
    } else {
      for (const row of tables) {
        const name = row[tableKey];
        await seq.query(`DROP TABLE IF EXISTS \`${name}\``);
        console.log(`Dropped: ${name}`);
      }
    }

    await seq.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('\nSemua table berhasil di-drop!');
    console.log('Sekarang jalankan: npx sequelize-cli db:migrate');
  } catch (e) {
    console.error('Error:', e.message);
  }
  process.exit(0);
})();
