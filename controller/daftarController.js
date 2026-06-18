const { Daftar, Pelanggan } = require('../models');

async function getListDaftar(req, res) {
  try {
    const daftars = await Daftar.findAll({
      include: [{ model: Pelanggan }]
    });
    res.json(daftars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getDaftarById(req, res) {
  try {
    const { id } = req.params;
    const daftar = await Daftar.findByPk(id, {
      include: [{ model: Pelanggan }]
    });
    if (!daftar) {
      return res.status(404).json({ error: 'Daftar tidak ditemukan' });
    }
    res.json(daftar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createDaftar(req, res) {
  try {
    const daftar = await Daftar.create(req.body);
    res.status(201).json(daftar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateDaftar(req, res) {
  try {
    const { id } = req.params;
    const daftar = await Daftar.findByPk(id);
    if (!daftar) {
      return res.status(404).json({ error: 'Daftar tidak ditemukan' });
    }
    await daftar.update(req.body);
    res.json(daftar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteDaftar(req, res) {
  try {
    const { id } = req.params;
    const daftar = await Daftar.findByPk(id);
    if (!daftar) {
      return res.status(404).json({ error: 'Daftar tidak ditemukan' });
    }
    await daftar.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getListDaftar, getDaftarById, createDaftar, updateDaftar, deleteDaftar };
