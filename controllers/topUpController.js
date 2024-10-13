const pool = require("../config/db");

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

    // Generate an invoice number for the transaction
    const invoiceNumber = `INV${Date.now()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    // Insert the transaction into the database with the total_amount column
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
