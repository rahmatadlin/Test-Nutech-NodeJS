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
