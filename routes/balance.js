const express = require('express');
const { checkBalance } = require('../controllers/balanceController');
const router = express.Router();

/**
 * @swagger
 * /balance:
 *   get:
 *     tags:
 *       - 3. Module Transaction
 *     description: Digunakan untuk mendapatkan informasi balance / saldo terakhir dari User
 *     security:
 *       - bearerAuth: []  # Requires JWT Token for Authorization
 *     responses:
 *       200:
 *         description: Get Balance / Saldo Berhasil
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
 *                   example: "Get Balance Berhasil"
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: number
 *                       format: float
 *                       example: 1000000
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
 *                   type: object
 *                   nullable: true
 *                   example: null
 */
router.get('/', checkBalance);

module.exports = router;
