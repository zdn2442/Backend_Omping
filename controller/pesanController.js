const { Pesan, Pelanggan, DetailPesan, Menu, Daftar } = require('../models');

async function getListPesan(req, res) {
  try {
    const pesans = await Pesan.findAll({
      include: [
        { model: Pelanggan },
        { model: DetailPesan, include: [{ model: Menu }] }
      ]
    });
    res.json(pesans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPesanById(req, res) {
  try {
    const { id } = req.params;
    const pesan = await Pesan.findByPk(id, {
      include: [
        { model: Pelanggan },
        { model: DetailPesan, include: [{ model: Menu }] }
      ]
    });
    if (!pesan) {
      return res.status(404).json({ error: 'Pesan tidak ditemukan' });
    }
    res.json(pesan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createPesan(req, res) {
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

    const pesan = await Pesan.create(req.body);
    res.status(201).json(pesan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updatePesan(req, res) {
  try {
    const { id } = req.params;
    const pesan = await Pesan.findByPk(id);
    if (!pesan) {
      return res.status(404).json({ error: 'Pesan tidak ditemukan' });
    }
    await pesan.update(req.body);
    res.json(pesan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deletePesan(req, res) {
  try {
    const { id } = req.params;
    const pesan = await Pesan.findByPk(id);
    if (!pesan) {
      return res.status(404).json({ error: 'Pesan tidak ditemukan' });
    }
    await pesan.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getListPesan, getPesanById, createPesan, updatePesan, deletePesan };
