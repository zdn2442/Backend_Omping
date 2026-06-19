const routers = require('express').Router();

// Import Controllers
const { login } = require('../controller/authController');
const { getListUser, getUserById, createUser, updateUser, deleteUser } = require('../controller/userController');
const { getListMenu, getMenuById, createMenu, updateMenu, deleteMenu } = require('../controller/menuController');
const { getListKaryawan, getKaryawanById, createKaryawan, updateKaryawan, deleteKaryawan } = require('../controller/karyawanController');
const { getListPelanggan, getPelangganById, createPelanggan, updatePelanggan, deletePelanggan } = require('../controller/pelangganController');
const { getListDaftar, getDaftarById, createDaftar, updateDaftar, deleteDaftar } = require('../controller/daftarController');
const { getListPesan, getPesanById, createPesan, updatePesan, deletePesan } = require('../controller/pesanController');
const { getListDetailPesan, getDetailPesanByPesanId, createDetailPesan, updateDetailPesan, deleteDetailPesan } = require('../controller/detailPesanController');
const { getListBayar, getBayarById, createBayar, updateBayar, deleteBayar } = require('../controller/bayarController');

// ==================== Auth Routes ====================
routers.post('/login', login);

// ==================== User Routes ====================
routers.get('/get/user', getListUser);
routers.get('/get/user/:id', getUserById);
routers.post('/create/user', createUser);
routers.put('/update/user/:id', updateUser);
routers.delete('/delete/user/:id', deleteUser);

const upload = require('../middleware/upload');

// ==================== Menu Routes ====================
routers.get('/get/menu', getListMenu);
routers.get('/get/menu/:id', getMenuById);
routers.post('/create/menu', upload.single('Gambar_Menu'), createMenu);
routers.put('/update/menu/:id', upload.single('Gambar_Menu'), updateMenu);
routers.delete('/delete/menu/:id', deleteMenu);

// ==================== Karyawan Routes ====================
routers.get('/get/karyawan', getListKaryawan);
routers.get('/get/karyawan/:id', getKaryawanById);
routers.post('/create/karyawan', createKaryawan);
routers.put('/update/karyawan/:id', updateKaryawan);
routers.delete('/delete/karyawan/:id', deleteKaryawan);

// ==================== Pelanggan Routes ====================
routers.get('/get/pelanggan', getListPelanggan);
routers.get('/get/pelanggan/:id', getPelangganById);
routers.post('/create/pelanggan', createPelanggan);
routers.put('/update/pelanggan/:id', updatePelanggan);
routers.delete('/delete/pelanggan/:id', deletePelanggan);

// ==================== Daftar Routes ====================
routers.get('/get/daftar', getListDaftar);
routers.get('/get/daftar/:id', getDaftarById);
routers.post('/create/daftar', createDaftar);
routers.put('/update/daftar/:id', updateDaftar);
routers.delete('/delete/daftar/:id', deleteDaftar);

// ==================== Pesan Routes ====================
routers.get('/get/pesan', getListPesan);
routers.get('/get/pesan/:id', getPesanById);
routers.post('/create/pesan', createPesan);
routers.put('/update/pesan/:id', updatePesan);
routers.delete('/delete/pesan/:id', deletePesan);

// ==================== Detail Pesan Routes ====================
routers.get('/get/detail-pesan', getListDetailPesan);
routers.get('/get/detail-pesan/:pesanId', getDetailPesanByPesanId);
routers.post('/create/detail-pesan', createDetailPesan);
routers.put('/update/detail-pesan/:pesanId/:menuId', updateDetailPesan);
routers.delete('/delete/detail-pesan/:pesanId/:menuId', deleteDetailPesan);

// ==================== Bayar Routes ====================
routers.get('/get/bayar', getListBayar);
routers.get('/get/bayar/:id', getBayarById);
routers.post('/create/bayar', createBayar);
routers.put('/update/bayar/:id', updateBayar);
routers.delete('/delete/bayar/:id', deleteBayar);

module.exports = routers;
