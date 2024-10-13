const pool = require("../config/db");
const moment = require('moment'); // Untuk memformat tanggal

// Fungsi untuk melakukan top up balance
exports.topUpBalance = async (req, res) => {
  try {
    // Cek apakah req.body valid
    if (!req.body || typeof req.body.top_up_amount === "undefined") {
      return res.status(400).json({
        status: 102,
        message: "Parameter top_up_amount harus di isi",
        data: null,
      });
    }

    const { top_up_amount } = req.body;

    // Mendapatkan ID pengguna dari middleware
    const userId = req.userId;

    // Mengambil saldo pengguna saat ini
    const [rows] = await pool.execute(
      "SELECT balance FROM users WHERE id = ?",
      [userId]
    );

    // Menambahkan saldo
    const currentBalance = rows[0].balance;
    const newBalance = currentBalance + top_up_amount;

    // Memperbarui saldo di database
    await pool.execute("UPDATE users SET balance = ? WHERE id = ?", [
      newBalance,
      userId,
    ]);

    // Mendapatkan tanggal hari ini dalam format DDMMYYYY
    const currentDate = moment().format('DDMMYYYY');

    // Mencari jumlah transaksi user di tanggal yang sama untuk membuat urutan invoice
    const [transactionCount] = await pool.execute(`
      SELECT COUNT(*) as count FROM transactions
      WHERE user_id = ? AND DATE(created_at) = CURDATE()
    `, [userId]);

    const invoiceOrder = String(transactionCount[0].count + 1).padStart(3, '0'); // Mengubah urutan menjadi 3 digit (001, 002, dst)

    // Generate nomor invoice dalam format INV17082023-001
    const invoiceNumber = `INV${currentDate}-${invoiceOrder}`;

    // Insert transaksi ke dalam database
    const transactionQuery = `
      INSERT INTO transactions (user_id, service_id, invoice_number, transaction_type, total_amount, created_at, updated_at)
      VALUES (?, NULL, ?, 'TOPUP', ?, NOW(), NOW())
    `;
    await pool.execute(transactionQuery, [userId, invoiceNumber, top_up_amount]);

    // Mengembalikan respons sukses
    return res.json({
      status: 0,
      message: "Top Up Balance berhasil",
      data: {
        balance: newBalance,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Server error",
      data: null,
    });
  }
};
