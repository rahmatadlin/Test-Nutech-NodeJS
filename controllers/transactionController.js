const pool = require('../config/db'); // Database connection
const moment = require('moment'); // Untuk format tanggal

// Function to handle making a transaction
const makeTransaction = async (req, res) => {
    const { service_code } = req.body;

    // Check for missing service_code
    if (!service_code) {
        return res.status(400).json({
            status: 102,
            message: "Service atau Layanan tidak ditemukan",
            data: null
        });
    }

    try {
        // Get user ID from middleware
        const userId = req.userId;

        // Fetch the service details based on the service_code
        const serviceQuery = `
            SELECT id, service_name, service_tariff FROM services WHERE service_code = ?
        `;
        const [service] = await pool.query(serviceQuery, [service_code]);

        // Check if the service exists
        if (!service.length) {
            return res.status(400).json({
                status: 102,
                message: "Service atau Layanan tidak ditemukan",
                data: null
            });
        }

        // Get the total amount for the service
        const totalAmount = service[0].service_tariff;

        // Check user balance
        const userBalance = await getUserBalance(userId);

        // Check if the user has sufficient balance
        if (userBalance < totalAmount) {
            return res.status(400).json({
                status: 102,
                message: "Saldo tidak mencukupi",
                data: null
            });
        }

        // Mendapatkan tanggal hari ini dalam format DDMMYYYY
        const currentDate = moment().format('DDMMYYYY');

        // Mencari jumlah transaksi user di tanggal yang sama untuk membuat urutan invoice
        const [transactionCount] = await pool.query(`
            SELECT COUNT(*) as count FROM transactions
            WHERE user_id = ? AND DATE(created_at) = CURDATE()
        `, [userId]);

        const invoiceOrder = String(transactionCount[0].count + 1).padStart(3, '0'); // Mengubah urutan menjadi 3 digit (001, 002, dst)

        // Generate nomor invoice dalam format INV17082023-001
        const invoiceNumber = `INV${currentDate}-${invoiceOrder}`;

        // Insert the transaction into the database with total_amount
        const transactionQuery = `
            INSERT INTO transactions (user_id, service_id, invoice_number, transaction_type, total_amount, created_at, updated_at)
            VALUES (?, ?, ?, 'PAYMENT', ?, NOW(), NOW())
        `;
        await pool.query(transactionQuery, [userId, service[0].id, invoiceNumber, totalAmount]);

        // Deduct the balance from the user
        await deductUserBalance(userId, totalAmount);

        // Prepare the response data
        const responseData = {
            invoice_number: invoiceNumber,
            service_code: service_code,
            service_name: service[0].service_name,
            transaction_type: 'PAYMENT',
            total_amount: totalAmount,
            created_on: new Date().toISOString()
        };

        // Return success response
        return res.status(200).json({
            status: 0,
            message: "Transaksi berhasil",
            data: responseData
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({
            status: 500,
            message: "Server error",
            data: null
        });
    }
};

// Helper function to get user balance
const getUserBalance = async (userId) => {
    const balanceQuery = `SELECT balance FROM users WHERE id = ?`;
    const [user] = await pool.query(balanceQuery, [userId]);
    return user.length ? user[0].balance : 0; // Return user's balance or 0 if not found
};

// Helper function to deduct user balance
const deductUserBalance = async (userId, amount) => {
    const deductQuery = `
        UPDATE users
        SET balance = balance - ?
        WHERE id = ?
    `;
    await pool.query(deductQuery, [amount, userId]);
};

module.exports = {
    makeTransaction
};
