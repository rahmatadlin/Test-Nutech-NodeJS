const pool = require('../config/db');

// Cek saldo pengguna
exports.checkBalance = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT balance FROM users WHERE id = ?', [req.user.id]);
    const balance = rows[0].balance;
    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
