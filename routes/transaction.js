const express = require('express');
const { makeTransaction } = require('../controllers/transactionController');
const { getTransactionHistory } = require('../controllers/transactionHistoryController');
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

/**
 * @swagger
 * /transaction/history:
 *   get:
 *     tags:
 *       - 3. Module Transaction
 *     description: Digunakan untuk mendapatkan informasi history transaksi
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: offset
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 0
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: Get History Transaksi berhasil
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
 *                   example: "Get History Berhasil"
 *                 data:
 *                   type: object
 *                   properties:
 *                     offset:
 *                       type: integer
 *                       example: 0
 *                     limit:
 *                       type: integer
 *                       example: 3
 *                     records:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           invoice_number:
 *                             type: string
 *                             example: "INV17082023-001"
 *                           transaction_type:
 *                             type: string
 *                             example: "TOPUP"
 *                           description:
 *                             type: string
 *                             example: "Top Up balance"
 *                           total_amount:
 *                             type: number
 *                             example: 100000
 *                           created_on:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-08-17T10:10:10.000Z"
 *                       example:
 *                         - invoice_number: "INV17082023-001"
 *                           transaction_type: "TOPUP"
 *                           description: "Top Up balance"
 *                           total_amount: 100000
 *                           created_on: "2023-08-17T10:10:10.000Z"
 *                         - invoice_number: "INV17082023-002"
 *                           transaction_type: "PAYMENT"
 *                           description: "PLN Pascabayar"
 *                           total_amount: 10000
 *                           created_on: "2023-08-17T11:10:10.000Z"
 *                         - invoice_number: "INV17082023-003"
 *                           transaction_type: "PAYMENT"
 *                           description: "Pulsa Indosat"
 *                           total_amount: 40000
 *                           created_on: "2023-08-17T12:10:10.000Z"
 *       401:
 *         description: Unauthorized
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
router.get('/history', getTransactionHistory);


module.exports = router;
