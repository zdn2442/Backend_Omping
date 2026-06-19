const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Pastikan folder uploads/menu ada
const uploadDir = path.join(__dirname, '..', 'uploads', 'menu');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Format: menu_timestamp.ext
    const ext = path.extname(file.originalname);
    const filename = `menu_${Date.now()}${ext}`;
    cb(null, filename);
  }
});

// Filter hanya menerima file gambar
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar (JPEG, PNG, WEBP) yang diizinkan'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Maksimal 5MB
  }
});

module.exports = upload;
