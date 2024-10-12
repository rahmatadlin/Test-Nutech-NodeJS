const pool = require('../config/db');

// Fungsi untuk melakukan top up balance
exports.topUpBalance = async (req, res) => {
  try {
    // Cek apakah req.body valid
    if (!req.body || typeof req.body.top_up_amount === 'undefined') {
      return res.status(400).json({
        status: 102,
        message: "Parameter top_up_amount harus di isi",
        data: null,
      });
    }

    const { top_up_amount } = req.body;

    // Validasi input: pastikan top_up_amount adalah angka dan tidak ada huruf
    if (typeof top_up_amount !== 'number' || top_up_amount <= 0) {
      // Check if top_up_amount is a string that can be parsed to a number
      if (typeof top_up_amount === 'string' && isNaN(parseFloat(top_up_amount))) {
        const invalidChar = top_up_amount.split('').find(char => isNaN(char) && char !== '.');
        return res.status(400).json({
          status: 400,
          message: `Unexpected token ${invalidChar} in JSON at position ${req.body.top_up_amount.indexOf(invalidChar) + 1}`,
          data: null,
        });
      }

      return res.status(400).json({
        status: 102,
        message: "Parameter top_up_amount harus berupa angka yang lebih besar dari 0",
        data: null,
      });
    }

    // Mengambil saldo pengguna saat ini
    const userId = req.userId; // Mendapatkan ID pengguna dari middleware
    const [rows] = await pool.execute('SELECT balance FROM users WHERE id = ?', [userId]);

    // Memeriksa apakah pengguna ditemukan
    if (rows.length === 0) {
      return res.status(401).json({
        status: 108,
        message: "Token tidak valid atau kadaluwarsa",
        data: null,
      });
    }

    // Menambahkan saldo
    const currentBalance = rows[0].balance;
    const newBalance = currentBalance + top_up_amount;

    // Memperbarui saldo di database
    await pool.execute('UPDATE users SET balance = ? WHERE id = ?', [newBalance, userId]);

    // Mengembalikan respons sukses
    return res.json({
      status: 0,
      message: "Top Up Balance berhasil",
      data: {
        balance: newBalance,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Server error",
      data: null,
    });
  }
};
