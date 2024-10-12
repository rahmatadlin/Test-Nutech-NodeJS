const express = require('express');
const { checkBalance } = require('../controllers/balanceController');
const auth = require('../middlewares/authentication.js');
const router = express.Router();

/**
 * @swagger
 * /api/balance:
 *   get:
 *     summary: Cek saldo pengguna
 *     description: Mengambil saldo pengguna yang sedang login.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Saldo berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *                   format: float
 *       401:
 *         description: Tidak terautentikasi
 *       500:
 *         description: Server error
 */
router.get('/', auth, checkBalance);

module.exports = router;
