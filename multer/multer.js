// multer/multer.js
const multer = require('multer');
const path = require('path');

// Fungsi untuk menghasilkan bagian acak
const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomPart = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomPart += characters[randomIndex];
  }
  return randomPart;
};

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pastikan folder uploads ada
  },
  filename: (req, file, cb) => {
    const randomPart = generateRandomString(8); // Panjang bagian acak
    const timestampPart = Date.now(); // Menggunakan timestamp
    cb(null, `${randomPart}-${timestampPart}${path.extname(file.originalname)}`); // Menggunakan format yang diinginkan
  }
});

// Inisialisasi multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal ukuran file 5MB
});

module.exports = upload;
