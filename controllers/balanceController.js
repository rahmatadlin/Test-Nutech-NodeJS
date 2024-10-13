const pool = require('../config/db');

// Check user balance
exports.checkBalance = async (req, res, next) => {
  try {
    const userId = req.userId; // Get user ID from middleware
    const [rows] = await pool.execute('SELECT balance FROM users WHERE id = ?', [userId]);
    
    // Check if balance was found
    if (rows.length === 0) {
      throw { name: "NotFound" }; // Throw a custom error if user not found
    }

    const balance = rows[0].balance;

    // Return response in the desired format
    res.json({
      status: 0,
      message: "Get Balance Berhasil",
      data: {
        balance: balance
      }
    });
    
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};
