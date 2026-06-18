const { DetailPesan, Pesan, Menu } = require('../models');

async function getListDetailPesan(req, res) {
  try {
    const details = await DetailPesan.findAll({
      include: [{ model: Pesan }, { model: Menu }]
    });
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getDetailPesanByPesanId(req, res) {
  try {
    const { pesanId } = req.params;
    const details = await DetailPesan.findAll({
      where: { Id_Pesan: pesanId },
      include: [{ model: Menu }]
    });
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createDetailPesan(req, res) {
  try {
    const detail = await DetailPesan.create(req.body);
    res.status(201).json(detail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateDetailPesan(req, res) {
  try {
    const { pesanId, menuId } = req.params;
    const detail = await DetailPesan.findOne({
      where: { Id_Pesan: pesanId, Id_Menu: menuId }
    });
    if (!detail) {
      return res.status(404).json({ error: 'Detail Pesan tidak ditemukan' });
    }
    await detail.update(req.body);
    res.json(detail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteDetailPesan(req, res) {
  try {
    const { pesanId, menuId } = req.params;
    const detail = await DetailPesan.findOne({
      where: { Id_Pesan: pesanId, Id_Menu: menuId }
    });
    if (!detail) {
      return res.status(404).json({ error: 'Detail Pesan tidak ditemukan' });
    }
    await detail.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getListDetailPesan, getDetailPesanByPesanId, createDetailPesan, updateDetailPesan, deleteDetailPesan };
