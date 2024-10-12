const express = require('express');
const { registration } = require('../controllers/registrationController');
const { login } = require('../controllers/loginController');
const router = express.Router();

/**
 * @swagger
 * /registration:
 *   post:
 *     tags:
 *       - 1. Module Membership
 *     description: Digunakan untuk melakukan registrasi User agar bisa Login kedalam aplikasi
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:  # Adding an example value
 *               email: "user@nutech-integrasi.com"
 *               first_name: "User"
 *               last_name: "Nutech"
 *               password: "abcdef1234"
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
 *                   nullable: true
 *             example:  # Adding an example response value
 *               status: 0
 *               message: "Registrasi berhasil silakan login"
 *               data: null
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
 *                   type: object
 *                   nullable: true
 *             example:  # Adding an example error response value
 *               status: 102
 *               message: "Parameter email tidak sesuai format"
 *               data: null
 */
router.post('/registration', registration);

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - 1. Module Membership
 *     description: Digunakan untuk melakukan login dan mendapatkan authentication berupa JWT (Json Web Token)
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:  # Adding an example value
 *               email: "user@nutech-integrasi.com"
 *               password: "abcdef1234"
 *     responses:
 *       200:
 *         description: Berhasil Login
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
 *                   properties:
 *                     token:
 *                       type: string
 *             example:  # Adding an example response value
 *               status: 0
 *               message: "Login Sukses"
 *               data: {
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNTRVdXRjYTdCS0ZPX0ZUZGZ1bXlJem9zSTRKa1VxUGZVZ0ROSTUwelRTQlo2aHoyY0hKZ1VMb1loM09HUUd0ekQxV3dTX194aHBNZTE2SGFscVRzcEhjS21UclJ3S2FYYmZob3AzdzFFUHJ2NFdBQmk1c0RpdV9DSnZTSWt2MDFTbEU0QU5pbVB0bUx5azZoUzlOalVQNEZaVVpfRVBtcEk4Y3pNc3ZWa2JFPSIsImlhdCI6MTYyNjkyODk3MSwiZXhwIjoyNTU2MTE4Nzk4fQ.9C9NvhZYKivhGWnrjo4Wr1Rv-wur1wCm0jqfK9XDD8U"
 *               }
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
 *                   type: object
 *                   nullable: true
 *             example:  # Adding an example error response value
 *               status: 102
 *               message: "Parameter email tidak sesuai format"
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
 *                   type: object
 *                   nullable: true
 *             example:  # Adding an example error response value
 *               status: 103
 *               message: "Username atau password salah"
 *               data: null
 */
router.post('/login', login);


// Export the router
module.exports = router;
