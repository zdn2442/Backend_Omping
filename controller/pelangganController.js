const { Pelanggan } = require('../models');

async function getListPelanggan(req, res) {
  try {
    const pelanggans = await Pelanggan.findAll();
    res.json(pelanggans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPelangganById(req, res) {
  try {
    const { id } = req.params;
    const pelanggan = await Pelanggan.findByPk(id);
    if (!pelanggan) {
      return res.status(404).json({ error: 'Pelanggan tidak ditemukan' });
    }
    res.json(pelanggan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createPelanggan(req, res) {
  try {
    const pelanggan = await Pelanggan.create(req.body);
    res.status(201).json(pelanggan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updatePelanggan(req, res) {
  try {
    const { id } = req.params;
    const pelanggan = await Pelanggan.findByPk(id);
    if (!pelanggan) {
      return res.status(404).json({ error: 'Pelanggan tidak ditemukan' });
    }
    await pelanggan.update(req.body);
    res.json(pelanggan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deletePelanggan(req, res) {
  try {
    const { id } = req.params;
    const pelanggan = await Pelanggan.findByPk(id);
    if (!pelanggan) {
      return res.status(404).json({ error: 'Pelanggan tidak ditemukan' });
    }
    await pelanggan.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getListPelanggan, getPelangganById, createPelanggan, updatePelanggan, deletePelanggan };
