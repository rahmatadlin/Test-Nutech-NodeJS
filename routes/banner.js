const express = require('express');
const router = express.Router();
const { getBanners } = require('../controllers/bannerController');

/**
 * @swagger
 * /banner:
 *   get:
 *     tags:
 *       - 2. Module Information
 *     description: Digunakan untuk mendapatkan list banner publik (tidak memerlukan token untuk mengaksesnya)
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
 *                       banner_name:
 *                         type: string
 *                       banner_image:
 *                         type: string
 *                       description:
 *                         type: string
 *             example:  # Adding an example response value
 *               status: 0
 *               message: "Sukses"
 *               data:
 *                 - banner_name: "Banner 1"
 *                   banner_image: "https://minio.nutech-integrasi.com/take-home-test/banner/Banner-1.png"
 *                   description: "Lerem Ipsum Dolor sit amet"
 *                 - banner_name: "Banner 2"
 *                   banner_image: "https://minio.nutech-integrasi.com/take-home-test/banner/Banner-2.png"
 *                   description: "Lerem Ipsum Dolor sit amet"
 *       401:
 *         description: Unauthorized (If the endpoint was secured)
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
 *             example:  # Adding an example error response value
 *               status: 108
 *               message: "Token tidak valid atau kadaluwarsa"
 *               data: null
 */
router.get('/banner', getBanners);

module.exports = router;
