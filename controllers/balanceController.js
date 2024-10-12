const pool = require('../config/db');

// Cek saldo pengguna
exports.checkBalance = async (req, res) => {
  try {
    const userId = req.userId; // Mendapatkan ID pengguna dari middleware
    const [rows] = await pool.execute('SELECT balance FROM users WHERE id = ?', [userId]);
    
    // Memeriksa apakah saldo ditemukan
    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
        data: null
      });
    }

    const balance = rows[0].balance;

    // Mengembalikan respons dengan format yang diinginkan
    res.json({
      status: 0,
      message: "Get Balance Berhasil",
      data: {
        balance: balance
      }
    });
    
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Server error',
      data: null
    });
  }
};
