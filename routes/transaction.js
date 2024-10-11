const express = require('express');
const { makeTransaction } = require('../controllers/transactionController');
const auth = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /api/transaction:
 *   post:
 *     summary: Buat transaksi baru
 *     description: Melakukan transaksi seperti pembelian pulsa atau voucher game.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - amount
 *             properties:
 *               type:
 *                 type: string
 *                 enum: ['Pulsa', 'Voucher Game']
 *               amount:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Transaksi berhasil
 *       400:
 *         description: Data transaksi tidak valid
 *       401:
 *         description: Tidak terautentikasi
 *       500:
 *         description: Server error
 */
router.post('/', auth, makeTransaction);

module.exports = router;
