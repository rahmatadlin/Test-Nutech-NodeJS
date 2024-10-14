const pool = require("../config/db"); // Assuming you are using a pool from the database config

// Controller to fetch transaction history
const getTransactionHistory = async (req, res, next) => {
  try {
    const { offset = 0, limit } = req.query;

    // Get user ID from middleware
    const userId = req.userId;

    // SQL query to fetch transaction history, joining with services table if service_id is present
    let query = `
      SELECT 
        transactions.invoice_number, 
        CASE 
          WHEN transactions.service_id IS NULL THEN 'TOPUP' 
          ELSE 'PAYMENT' 
        END AS transaction_type,
        CASE 
          WHEN transactions.service_id IS NULL THEN 'Top Up Balance' 
          ELSE services.service_name 
        END AS description,
        transactions.total_amount, 
        transactions.created_at AS created_on
      FROM transactions
      LEFT JOIN services ON transactions.service_id = services.id
      WHERE transactions.user_id = $1
      ORDER BY transactions.created_at DESC
    `;

    // Append LIMIT and OFFSET if limit is provided
    const queryParams = [userId];
    if (limit) {
      query += ` LIMIT $2 OFFSET $3`;
      queryParams.push(parseInt(limit), parseInt(offset)); // Insert limit and offset
    }

    const { rows: results } = await pool.query(query, queryParams);

    // If limit is not set, we will get all records
    const totalCountQuery = `SELECT COUNT(*) AS count FROM transactions WHERE user_id = $1`;
    const { rows: countResult } = await pool.query(totalCountQuery, [userId]);
    const totalRecords = countResult[0].count;

    // Respond with the formatted transaction history
    return res.status(200).json({
      status: 0,
      message: "Get History Berhasil",
      data: {
        offset: parseInt(offset),
        limit: limit ? parseInt(limit) : totalRecords, // Show totalRecords if limit is not set
        records: results,
      },
    });
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    next(error); // Pass the error to the error handler
  }
};

module.exports = {
  getTransactionHistory,
};
