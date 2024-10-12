const express = require('express');
const { topUpBalance } = require('../controllers/topUpController');
const auth = require('../middlewares/authentication.js');
const router = express.Router();

/**
 * @swagger
 * /api/topup:
 *   post:
 *     summary: Top up saldo pengguna
 *     description: Menambahkan saldo ke akun pengguna.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Saldo berhasil ditambahkan
 *       400:
 *         description: Jumlah tidak valid
 *       401:
 *         description: Tidak terautentikasi
 *       500:
 *         description: Server error
 */
router.post('/', auth, topUpBalance);

module.exports = router;
