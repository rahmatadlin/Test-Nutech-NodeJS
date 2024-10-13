const pool = require("../config/db"); // Assuming you are using a pool from the database config

// Controller to fetch transaction history
const getTransactionHistory = async (req, res) => {
  try {
    const { offset = 0, limit } = req.query;

    // Get user ID from middleware
    const userId = req.userId;

    // SQL query to fetch transaction history, joining with services table if service_id is present
    let query = `
      SELECT 
        transactions.invoice_number, 
        IF(transactions.service_id IS NULL, 'TOPUP', 'PAYMENT') AS transaction_type,
        IF(transactions.service_id IS NULL, 'Top Up Balance', services.service_name) AS description,
        transactions.total_amount, 
        transactions.created_at AS created_on
      FROM transactions
      LEFT JOIN services ON transactions.service_id = services.id
      WHERE transactions.user_id = ?
      ORDER BY transactions.created_at DESC
    `;

    // Append LIMIT and OFFSET if limit is provided
    const queryParams = [userId, parseInt(offset)];
    if (limit) {
      query += ` LIMIT ? OFFSET ?`;
      queryParams.splice(1, 0, parseInt(limit)); // Insert limit before offset
    }

    const [results] = await pool.query(query, queryParams);

    // Respond with the formatted transaction history
    return res.status(200).json({
      status: 0,
      message: "Get History Berhasil",
      data: {
        offset: parseInt(offset),
        limit: limit ? parseInt(limit) : results.length, // Show "All" if no limit is set
        records: results,
      },
    });
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    return res.status(500).json({
      status: 500,
      message: "Server error",
      data: null,
    });
  }
};

module.exports = {
  getTransactionHistory,
};
