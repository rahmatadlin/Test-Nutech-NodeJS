// controllers/profile.js
const db = require('../config/db');

// Get user profile
exports.profile = async (req, res) => {
  const userId = req.userId; // Get user ID from the middleware

  // Fetch the user's profile from the database
  const [rows] = await db.query('SELECT email, first_name, last_name, profile_image FROM users WHERE id = ?', [userId]);

  // Check if user exists
  if (rows.length === 0) {
    return res.status(404).json({
      status: 108,
      message: 'User tidak ditemukan',
      data: null,
    });
  }

  const userProfile = rows[0];

  // Send response with user profile data
  res.status(200).json({
    status: 0,
    message: 'Sukses',
    data: userProfile,
  });
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    // Ambil token dari header authorization
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({
        status: 108,
        message: "Token tidak valid atau kadaluwarsa",
        data: null,
      });
    }

    // Verifikasi token dan ambil email dari payload JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    if (!email) {
      return res.status(401).json({
        status: 108,
        message: "Token tidak valid atau kadaluwarsa",
        data: null,
      });
    }

    // Ambil data dari request body
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
      profile_image: "https://yoururlapi.com/profile.jpeg",
    };

    // Respon sukses
    return res.status(200).json({
      status: 0,
      message: "Update Profile berhasil",
      data: updatedUser,
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: 108,
        message: "Token tidak valid atau kadaluwarsa",
        data: null,
      });
    }

    // Error lainnya
    return res.status(500).json({
      status: 500,
      message: "Terjadi kesalahan server",
      data: null,
    });
  }
};