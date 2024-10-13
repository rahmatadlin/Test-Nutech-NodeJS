// helpers/invoiceHelper.js

const pool = require('../config/db');
const moment = require('moment');

// Fungsi untuk menghasilkan nomor invoice
const generateInvoiceNumber = async (userId) => {
  // Mendapatkan tanggal hari ini dalam format DDMMYYYY
  const currentDate = moment().format('DDMMYYYY');

  // Mencari jumlah transaksi user di tanggal yang sama untuk membuat urutan invoice
  const [transactionCount] = await pool.execute(`
    SELECT COUNT(*) as count FROM transactions
    WHERE user_id = ? AND DATE(created_at) = CURDATE()
  `, [userId]);

  const invoiceOrder = String(transactionCount[0].count + 1).padStart(3, '0'); // Mengubah urutan menjadi 3 digit (001, 002, dst)

  // Generate nomor invoice dalam format INV17082023-001
  return `INV${currentDate}-${invoiceOrder}`;
};

module.exports = {
  generateInvoiceNumber,
};
