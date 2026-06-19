const express = require('express');
const cors = require('cors');

const env = process.env.NODE_ENV || 'development';

// Hanya load dari file .env di development/test
if (env !== 'production') {
  require('dotenv').config({
    path: `.env.${env}`
  });
}

const routers = require('./routes/index');
const db = require('./models');

const app = express();

// CORS - agar frontend bisa mengakses API
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (gambar menu dll)
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root route - API info
app.get('/', (req, res) => {
  res.json({
    message: 'Backend Omping API',
    version: '1.0.0',
    environment: env,
    endpoints: {
      auth: 'POST /login',
      user: '/get/user | /create/user | /update/user/:id | /delete/user/:id',
      menu: '/get/menu | /create/menu | /update/menu/:id | /delete/menu/:id',
      karyawan: '/get/karyawan | /create/karyawan | /update/karyawan/:id | /delete/karyawan/:id',
      pelanggan: '/get/pelanggan | /create/pelanggan | /update/pelanggan/:id | /delete/pelanggan/:id',
      daftar: '/get/daftar | /create/daftar | /update/daftar/:id | /delete/daftar/:id',
      pesan: '/get/pesan | /create/pesan | /update/pesan/:id | /delete/pesan/:id',
      detail_pesan: '/get/detail-pesan | /create/detail-pesan | /update/detail-pesan/:pesanId/:menuId | /delete/detail-pesan/:pesanId/:menuId',
      bayar: '/get/bayar | /create/bayar | /update/bayar/:id | /delete/bayar/:id'
    }
  });
});

app.use(routers);

// Sinkronisasi DB dan jalankan server
const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server berjalan di port ${PORT} [${env}]`));
});