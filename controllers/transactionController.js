const pool = require('../config/db');

// Buat transaksi
exports.makeTransaction = async (req, res) => {
  const { type, amount } = req.body;
  if (amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

  try {
    const [user] = await pool.execute('SELECT balance FROM users WHERE id = ?', [req.user.id]);
    if (user[0].balance < amount) return res.status(400).json({ error: 'Insufficient balance' });

    await pool.execute('UPDATE users SET balance = balance - ? WHERE id = ?', [amount, req.user.id]);
    await pool.execute('INSERT INTO transactions (user_id, type, amount) VALUES (?, ?, ?)', [req.user.id, type, amount]);

    res.json({ message: 'Transaction successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
