const pool = require('../config/db');
const moment = require('moment');

// Function to generate invoice number
const generateInvoiceNumber = async (userId) => {
  // Get today's date in the format DDMMYYYY
  const currentDate = moment().format('DDMMYYYY');

  // Query to count transactions for the user on the same date
  const { rows } = await pool.query(`
    SELECT COUNT(*) as count FROM transactions
    WHERE user_id = $1 AND DATE(created_at) = CURRENT_DATE
  `, [userId]);

  const invoiceOrder = String(parseInt(rows[0].count, 10) + 1).padStart(3, '0'); // Convert count to number and pad to 3 digits (001, 002, etc.)

  // Generate invoice number in the format INV17082023-001
  return `INV${currentDate}-${invoiceOrder}`;
};

module.exports = {
  generateInvoiceNumber,
};
