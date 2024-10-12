// controllers/profile.js
const db = require('../config/db');
const path = require('path');

// Get user profile
exports.getProfile = async (req, res) => {
  const userId = req.userId; // Mendapatkan ID pengguna dari middleware

  // Mengambil profil pengguna dari database
  const [rows] = await db.query('SELECT email, first_name, last_name, profile_image FROM users WHERE id = ?', [userId]);

  // Memeriksa apakah pengguna ada
  if (rows.length === 0) {
    return res.status(404).json({
      status: 108,
      message: 'User tidak ditemukan',
      data: null,
    });
  }

  const userProfile = rows[0];

  // Mengirim respons dengan data profil pengguna
  res.status(200).json({
    status: 0,
    message: 'Sukses',
    data: userProfile,
  });
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const email = req.userEmail; // Mengambil email dari request setelah validasi token di middleware

    // Mengambil data dari request body
    const { first_name, last_name } = req.body;

    // Lakukan validasi untuk first_name dan last_name
    if (!first_name) {
      return res.status(400).json({
        status: 102,
        message: "Parameter first_name harus di isi",
        data: null,
      });
    }

    if (!last_name) {
      return res.status(400).json({
        status: 102,
        message: "Parameter last_name harus di isi",
        data: null,
      });
    }

    // Update data di database
    const updateQuery = `UPDATE users SET first_name = ?, last_name = ? WHERE email = ?`;
    const result = await db.query(updateQuery, [first_name, last_name, email]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 110,
        message: "User tidak ditemukan",
        data: null,
      });
    }

    // Contoh data user setelah update
    const updatedUser = {
      email,
      first_name,
      last_name,
      profile_image: "https://yoururlapi.com/profile.jpeg", // URL gambar profil yang dapat disesuaikan
    };

    // Respon sukses
    return res.status(200).json({
      status: 0,
      message: "Update Profile berhasil",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Terjadi kesalahan server",
      data: null,
    });
  }
};

// Upload profile image
exports.uploadProfileImage = async (req, res) => {
  // Cek apakah file di-upload
  if (!req.file) {
    return res.status(400).json({
      status: 102,
      message: "Field file tidak boleh kosong",
      data: null,
    });
  }

  // Validasi format file
  const ext = path.extname(req.file.originalname).toLowerCase();
  if (ext !== '.png' && ext !== '.jpeg') {
    return res.status(400).json({
      status: 102,
      message: 'Format Image tidak sesuai',
      data: null,
    });
  }

  // Ambil data user dari payload JWT
  const userEmail = req.userEmail; // Ambil email dari JWT payload
  const profileImageUrl = `https://yoururlapi.com/${req.file.filename}`; // Ubah ini sesuai dengan URL gambar yang sebenarnya

  // Update URL gambar profil di database
  const updateQuery = `UPDATE users SET profile_image = ? WHERE email = ?`;
  await db.query(updateQuery, [profileImageUrl, userEmail]);

  // Merespons dengan informasi profil yang diperbarui
  return res.status(200).json({
    status: 0,
    message: "Update Profile Image berhasil",
    data: {
      email: userEmail,
      profile_image: profileImageUrl,
    },
  });
};
