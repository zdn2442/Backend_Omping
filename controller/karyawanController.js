const { Karyawan, User } = require('../models');

async function getListKaryawan(req, res) {
  try {
    const karyawans = await Karyawan.findAll({
      include: [{ model: User }]
    });
    res.json(karyawans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getKaryawanById(req, res) {
  try {
    const { id } = req.params;
    const karyawan = await Karyawan.findByPk(id, {
      include: [{ model: User }]
    });
    if (!karyawan) {
      return res.status(404).json({ error: 'Karyawan tidak ditemukan' });
    }
    res.json(karyawan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createKaryawan(req, res) {
  try {
    const karyawan = await Karyawan.create(req.body);
    res.status(201).json(karyawan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateKaryawan(req, res) {
  try {
    const { id } = req.params;
    const karyawan = await Karyawan.findByPk(id);
    if (!karyawan) {
      return res.status(404).json({ error: 'Karyawan tidak ditemukan' });
    }
    await karyawan.update(req.body);
    res.json(karyawan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteKaryawan(req, res) {
  try {
    const { id } = req.params;
    const karyawan = await Karyawan.findByPk(id);
    if (!karyawan) {
      return res.status(404).json({ error: 'Karyawan tidak ditemukan' });
    }
    await karyawan.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getListKaryawan, getKaryawanById, createKaryawan, updateKaryawan, deleteKaryawan };