const express = require('express');
const { makeTransaction } = require('../controllers/transactionController');
const router = express.Router();

/**
 * @swagger
 * /transaction:
 *   post:
 *     tags:
 *       - 3. Module Transaction
 *     description: Digunakan untuk melakukan top up balance / saldo dari User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service_code
 *             properties:
 *               service_code:
 *                 type: string
 *                 enum: ['PULSA', 'VOUCHER_GAME']  # Update to reflect available service codes
 *     responses:
 *       200:
 *         description: Transaksi berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Transaksi berhasil"
 *                 data:
 *                   type: object
 *                   properties:
 *                     invoice_number:
 *                       type: string
 *                       example: "INV17082023-001"
 *                     service_code:
 *                       type: string
 *                       example: "PULSA"
 *                     service_name:
 *                       type: string
 *                       example: "Pulsa"
 *                     transaction_type:
 *                       type: string
 *                       example: "PAYMENT"
 *                     total_amount:
 *                       type: number
 *                       example: 10000
 *                     created_on:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-08-17T10:10:10.000Z"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 102
 *                 message:
 *                   type: string
 *                   example: "Service atau Layanan tidak ditemukan"
 *                 data:
 *                   type: null
 *       401:
 *         description: 	Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: "Token tidak valid atau kadaluwarsa"
 *                 data:
 *                   type: null
 */
router.post('/', makeTransaction);

module.exports = router;
