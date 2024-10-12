const pool = require('../config/db');

// Cek saldo pengguna
exports.checkBalance = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT balance FROM users WHERE id = ?', [req.user.id]);
    
    // Memeriksa apakah saldo ditemukan
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const balance = rows[0].balance;

    // Memeriksa apakah saldo adalah 0
    if (balance === 0) {
      return res.json({ message: 'Your balance is empty. Please top up your account.' });
    }

    // Mengembalikan respons dengan format yang diinginkan jika saldo tidak kosong
    res.json({ message: `Your balance is Rp. ${balance}` });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
