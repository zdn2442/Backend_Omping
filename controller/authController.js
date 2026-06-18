const { User, Karyawan } = require('../models');

async function login(req, res) {
  try {
    const { Nama_User, Password } = req.body;

    // Validasi input
    if (!Nama_User || !Password) {
      return res.status(400).json({
        error: 'Nama_User dan Password harus diisi.'
      });
    }

    // Cari user berdasarkan Nama_User
    const user = await User.findOne({
      where: { Nama_User }
    });

    if (!user) {
      return res.status(401).json({
        error: 'Nama User tidak ditemukan.'
      });
    }

    // Cocokkan password
    if (user.Password !== Password) {
      return res.status(401).json({
        error: 'Password salah.'
      });
    }

    // Ambil data karyawan yang terkait dengan user ini
    const karyawan = await Karyawan.findOne({
      where: { Id_User: user.Id_User }
    });

    if (!karyawan) {
      return res.status(403).json({
        error: 'User ini belum terdaftar sebagai karyawan.'
      });
    }

    // Validasi posisi: hanya Owner, Kasir, Dapur yang boleh login
    const posisiValid = ['owner', 'kasir', 'dapur'];
    if (!posisiValid.includes(karyawan.Posisi_Karyawan.toLowerCase())) {
      return res.status(403).json({
        error: `Posisi "${karyawan.Posisi_Karyawan}" tidak memiliki akses login.`
      });
    }

    // Login berhasil
    res.json({
      message: 'Login berhasil!',
      data: {
        Id_User: user.Id_User,
        Nama_User: user.Nama_User,
        Id_Karyawan: karyawan.Id_Karyawan,
        Nama_Karyawan: karyawan.Nama_Karyawan,
        Posisi_Karyawan: karyawan.Posisi_Karyawan,
        No_Hp_Karyawan: karyawan.No_Hp_Karyawan
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { login };
