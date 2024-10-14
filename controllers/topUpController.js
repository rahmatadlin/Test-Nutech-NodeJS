const pool = require("../config/db");
const { generateInvoiceNumber } = require('../helpers/generateInvoice'); // Import helper

// Function to top up balance
exports.topUpBalance = async (req, res, next) => {
  try {
    // Check if req.body is valid
    if (!req.body || typeof req.body.top_up_amount === "undefined") {
      throw { name: "MissingTopUpAmount" }; // Throw custom error if missing
    }

    const { top_up_amount } = req.body;

    // Validate top_up_amount
    if (typeof top_up_amount !== 'number' || top_up_amount <= 0) {
      throw { name: "InvalidTopUpAmount" }; // Throw custom error if invalid
    }

    // Get user ID from middleware
    const userId = req.userId;

    // Get current balance of the user
    const { rows } = await pool.query(
      "SELECT balance FROM users WHERE id = $1",
      [userId]
    );

    // Check if user exists
    if (rows.length === 0) {
      throw { name: "NotFound" }; // User not found
    }

    const currentBalance = rows[0].balance;

    // Ensure currentBalance is a number
    const newBalance = Number(currentBalance) + Number(top_up_amount);

    // Update balance in the database
    await pool.query("UPDATE users SET balance = $1 WHERE id = $2", [
      newBalance,
      userId,
    ]);

    // Generate invoice number
    const invoiceNumber = await generateInvoiceNumber(userId);

    // Insert transaction into the database
    const transactionQuery = `
      INSERT INTO transactions (user_id, service_id, invoice_number, transaction_type, total_amount, created_at, updated_at)
      VALUES ($1, NULL, $2, 'TOPUP', $3, NOW(), NOW())
    `;
    await pool.query(transactionQuery, [userId, invoiceNumber, top_up_amount]);

    // Return successful response
    return res.json({
      status: 0,
      message: "Top Up Balance berhasil",
      data: {
        balance: newBalance,
      },
    });
  } catch (error) {
    console.error(error);
    if (error.name === "MissingTopUpAmount") {
      return res.status(400).json({
        status: 102,
        message: "Parameter top_up_amount harus di isi",
        data: null,
      });
    }
    if (error.name === "InvalidTopUpAmount") {
      return res.status(400).json({
        status: 102,
        message: "Parameter top_up_amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
        data: null,
      });
    }
    next(error); // Pass other errors to the error handler
  }
};
