const pool = require('../config/db');

// Top Up saldo pengguna
exports.topUpBalance = async (req, res) => {
  const { amount } = req.body;

  // Memeriksa jumlah top up yang valid dan minimal Rp. 10.000
  if (amount < 10000) {
    return res.status(400).json({ error: 'The minimum top-up amount is Rp. 10,000.' });
  }

  if (amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  try {
    await pool.execute('UPDATE users SET balance = balance + ? WHERE id = ?', [amount, req.user.id]);
    res.json({ message: 'Balance topped up successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
