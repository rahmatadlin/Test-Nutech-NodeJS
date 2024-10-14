const pool = require('../config/db');

// Check user balance
exports.checkBalance = async (req, res, next) => {
  try {
    const userId = req.userId; // Get user ID from middleware

    // Query to select the user's balance from the PostgreSQL database
    const { rows } = await pool.query('SELECT balance FROM users WHERE id = $1', [userId]);

    // Check if user with the given ID exists
    if (rows.length === 0) {
      throw { name: "NotFound" }; // Throw a custom error if user not found
    }

    const balance = rows[0].balance;

    // Return the balance in the desired format
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
