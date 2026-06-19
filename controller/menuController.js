const path = require('path');
const fs = require('fs');
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
    const data = {
      Nama_Menu: req.body.Nama_Menu,
      Harga_Menu: req.body.Harga_Menu,
      Kategori_Menu: req.body.Kategori_Menu,
    };

    // Jika ada file gambar yang diupload
    if (req.file) {
      data.Gambar_Menu = `/uploads/menu/${req.file.filename}`;
    }

    const menu = await Menu.create(data);
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

    const data = {};
    if (req.body.Nama_Menu) data.Nama_Menu = req.body.Nama_Menu;
    if (req.body.Harga_Menu) data.Harga_Menu = req.body.Harga_Menu;
    if (req.body.Kategori_Menu) data.Kategori_Menu = req.body.Kategori_Menu;

    // Jika ada file gambar baru, hapus gambar lama
    if (req.file) {
      if (menu.Gambar_Menu) {
        const oldPath = path.join(__dirname, '..', menu.Gambar_Menu);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      data.Gambar_Menu = `/uploads/menu/${req.file.filename}`;
    }

    await menu.update(data);
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

    // Hapus file gambar jika ada
    if (menu.Gambar_Menu) {
      const filePath = path.join(__dirname, '..', menu.Gambar_Menu);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await menu.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getListMenu, getMenuById, createMenu, updateMenu, deleteMenu };