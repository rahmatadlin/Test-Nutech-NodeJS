const express = require("express");
const { topUpBalance } = require("../controllers/topUpController.js");
const router = express.Router();

/**
 * @swagger
 * /topup:
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
 *               - top_up_amount
 *             properties:
 *               top_up_amount:
 *                 type: integer
 *                 example: 1000000
 *     responses:
 *       200:
 *         description: Request Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: integer
 *             example:  # Adding an example successful response value
 *               status: 0
 *               message: "Top Up Balance berhasil"
 *               data:
 *                 balance: 2000000
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 *             example:  # Adding an example error response value
 *               status: 102
 *               message: "Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0"
 *               data: null
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 *             example:  # Adding an example error response value
 *               status: 108
 *               message: "Token tidak valid atau kadaluwarsa"
 *               data: null
 */
router.post("/", topUpBalance);

module.exports = router;
