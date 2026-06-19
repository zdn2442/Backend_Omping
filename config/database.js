const { Sequelize } = require("sequelize");

const env = process.env.NODE_ENV || 'development';

// Hanya load dari file .env di development/test (lokal)
// Di production (Railway dll), env vars sudah di-set langsung oleh platform
if (env !== 'production') {
  require("dotenv").config({
    path: `.env.${env}`
  });
}

const sequelizeOptions = {
  dialect: process.env.DB_DIALECT || 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: env === 'development' ? console.log : false,
};

const sequelize = new Sequelize(sequelizeOptions);

module.exports = sequelize;
