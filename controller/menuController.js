const { Menu } = require('../models');

async function getListMenu(req, res) {
  try {
    const menus = await Menu.findAll();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getMenuById(req, res) {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id);
    if (!menu) {
      return res.status(404).json({ error: 'Menu tidak ditemukan' });
    }
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createMenu(req, res) {
  try {
    const menu = await Menu.create(req.body);
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateMenu(req, res) {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id);
    if (!menu) {
      return res.status(404).json({ error: 'Menu tidak ditemukan' });
    }
    await menu.update(req.body);
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteMenu(req, res) {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id);
    if (!menu) {
      return res.status(404).json({ error: 'Menu tidak ditemukan' });
    }
    await menu.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getListMenu, getMenuById, createMenu, updateMenu, deleteMenu };