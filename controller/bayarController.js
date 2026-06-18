const { Bayar, Pelanggan, Karyawan, Pesan, Daftar } = require('../models');

async function getListBayar(req, res) {
  try {
    const bayars = await Bayar.findAll({
      include: [
        { model: Pelanggan },
        { model: Karyawan },
        { model: Pesan }
      ]
    });
    res.json(bayars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getBayarById(req, res) {
  try {
    const { id } = req.params;
    const bayar = await Bayar.findByPk(id, {
      include: [
        { model: Pelanggan },
        { model: Karyawan },
        { model: Pesan }
      ]
    });
    if (!bayar) {
      return res.status(404).json({ error: 'Bayar tidak ditemukan' });
    }
    res.json(bayar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createBayar(req, res) {
  try {
    // Cek apakah pelanggan sudah terdaftar di tabel Daftar
    const daftar = await Daftar.findOne({
      where: { Id_Pelanggan: req.body.Id_Pelanggan }
    });
    if (!daftar) {
      return res.status(403).json({
        error: 'Pelanggan belum terdaftar. Silakan registrasi terlebih dahulu.'
      });
    }

    const bayar = await Bayar.create(req.body);
    res.status(201).json(bayar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateBayar(req, res) {
  try {
    const { id } = req.params;
    const bayar = await Bayar.findByPk(id);
    if (!bayar) {
      return res.status(404).json({ error: 'Bayar tidak ditemukan' });
    }
    await bayar.update(req.body);
    res.json(bayar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteBayar(req, res) {
  try {
    const { id } = req.params;
    const bayar = await Bayar.findByPk(id);
    if (!bayar) {
      return res.status(404).json({ error: 'Bayar tidak ditemukan' });
    }
    await bayar.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getListBayar, getBayarById, createBayar, updateBayar, deleteBayar };
