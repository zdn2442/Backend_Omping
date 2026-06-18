const { Sequelize } = require("sequelize");

const env = process.env.NODE_ENV || 'development';

// Load env file berdasarkan NODE_ENV
require("dotenv").config({
  path: `.env.${env}`
});

const sequelizeOptions = {
  dialect: process.env.DB_DIALECT || 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: env === 'development' ? console.log : false,
};

// Tambah SSL untuk production (cloud database)
if (env === 'production') {
  sequelizeOptions.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  };
}

const sequelize = new Sequelize(sequelizeOptions);

module.exports = sequelize;
