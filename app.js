const express = require('express');
require('dotenv').config();
const routers = require('./routes/index');
const db = require('./models');

const app = express();
app.use(express.json());
app.use(routers);

// Sinkronisasi DB dan jalankan server
const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
});