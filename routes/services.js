const express = require('express');
const { getServices } = require('../controllers/serviceController');
const router = express.Router();

/**
 * @swagger
 * /services:
 *   get:
 *     tags:
 *       - 2. Module Information
 *     description: Digunakan untuk mendapatkan list Service/Layanan PPOB
 *     security:
 *       - bearerAuth: []  # Requires JWT Token for Authorization
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       service_code:
 *                         type: string
 *                       service_name:
 *                         type: string
 *                       service_icon:
 *                         type: string
 *                       service_tariff:
 *                         type: integer
 *               example:  # Adding an example response value
 *                 status: 0
 *                 message: "Sukses"
 *                 data: [
 *                   {
 *                     "service_code": "PAJAK",
 *                     "service_name": "Pajak PBB",
 *                     "service_icon": "https://nutech-integrasi.app/dummy.jpg",
 *                     "service_tariff": 40000
 *                   },
 *                   {
 *                     "service_code": "PLN",
 *                     "service_name": "Listrik",
 *                     "service_icon": "https://nutech-integrasi.app/dummy.jpg",
 *                     "service_tariff": 10000
 *                   },
 *                   {
 *                     "service_code": "PDAM",
 *                     "service_name": "PDAM Berlangganan",
 *                     "service_icon": "https://nutech-integrasi.app/dummy.jpg",
 *                     "service_tariff": 40000
 *                   },
 *                   {
 *                     "service_code": "PULSA",
 *                     "service_name": "Pulsa",
 *                     "service_icon": "https://nutech-integrasi.app/dummy.jpg",
 *                     "service_tariff": 40000
 *                   },
 *                   {
 *                     "service_code": "PGN",
 *                     "service_name": "PGN Berlangganan",
 *                     "service_icon": "https://nutech-integrasi.app/dummy.jpg",
 *                     "service_tariff": 50000
 *                   },
 *                   {
 *                     "service_code": "MUSIK",
 *                     "service_name": "Musik Berlangganan",
 *                     "service_icon": "https://nutech-integrasi.app/dummy.jpg",
 *                     "service_tariff": 50000
 *                   },
 *                   {
 *                     "service_code": "TV",
 *                     "service_name": "TV Berlangganan",
 *                     "service_icon": "https://nutech-integrasi.app/dummy.jpg",
 *                     "service_tariff": 50000
 *                   },
 *                   {
 *                     "service_code": "PAKET_DATA",
 *                     "service_name": "Paket data",
 *                     "service_icon": "https://nutech-integrasi.app/dummy.jpg",
 *                     "service_tariff": 50000
 *                   },
 *                   {
 *                     "service_code": "VOUCHER_GAME",
 *                     "service_name": "Voucher Game",
 *                     "service_icon": "https://nutech-integrasi.app/dummy.jpg",
 *                     "service_tariff": 100000
 *                   },
 *                   {
 *                     "service_code": "VOUCHER_MAKANAN",
 *                     "service_name": "Voucher Makanan",
 *                     "service_icon": "https://nutech-integrasi.app/dummy.jpg",
 *                     "service_tariff": 100000
 *                   },
 *                   {
 *                     "service_code": "QURBAN",
 *                     "service_name": "Qurban",
 *                     "service_icon": "https://nutech-integrasi.app/dummy.jpg",
 *                     "service_tariff": 200000
 *                   },
 *                   {
 *                     "service_code": "ZAKAT",
 *                     "service_name": "Zakat",
 *                     "service_icon": "https://nutech-integrasi.app/dummy.jpg",
 *                     "service_tariff": 300000
 *                   },                  
 *                 ]
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
 *                   type: object
 *                   nullable: true
 *               example:  # Adding an example error response value
 *                 status: 108
 *                 message: "Token tidak valid atau kadaluwarsa"
 *                 data: null
 */

// Route for fetching services
router.get('/', getServices);

module.exports = router;
