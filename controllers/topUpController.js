const pool = require('../config/db');

// Top Up saldo pengguna
exports.topUpBalance = async (req, res) => {
  const { amount } = req.body;
  if (amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

  try {
    await pool.execute('UPDATE users SET balance = balance + ? WHERE id = ?', [amount, req.user.id]);
    res.json({ message: 'Balance topped up successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
