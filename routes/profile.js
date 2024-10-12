const express = require("express");
const { profile, updateProfile } = require("../controllers/profileController");
const router = express.Router();

/**
 * @swagger
 * /profile:
 *   get:
 *     tags:
 *       - 1. Module Membership
 *     description: Digunakan untuk mendapatkan informasi profile User
 *     security:
 *       - bearerAuth: []  # Indicating that this route requires authentication
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
 *                     email:
 *                       type: string
 *                     first_name:
 *                       type: string
 *                     last_name:
 *                       type: string
 *                     profile_image:
 *                       type: string
 *             example:  # Adding an example response value
 *               status: 0
 *               message: "Sukses"
 *               data: {
 *                 email: "user@nutech-integrasi.com",
 *                 first_name: "User",
 *                 last_name: "Nutech",
 *                 profile_image: "https://yoururlapi.com/profile.jpeg"
 *               }
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
 *               status: 108
 *               message: "Token tidak tidak valid atau kadaluwarsa"
 *               data: null
 */

// Define the route handler (assuming you have a function to handle getting user profile)
router.get("/", profile);

/**
 * @swagger
 * /profile/update:
 *   put:
 *     tags:
 *       - 1. Module Membership
 *     description: Digunakan untuk mengupdate data profile User
 *     security:
 *       - bearerAuth: []  # Authentication using Bearer Token JWT
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *           example:
 *             first_name: "User Edited"
 *             last_name: "Nutech Edited"
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
 *                     email:
 *                       type: string
 *                     first_name:
 *                       type: string
 *                     last_name:
 *                       type: string
 *                     profile_image:
 *                       type: string
 *             example:
 *               status: 0
 *               message: "Update Profile berhasil"
 *               data:
 *                 email: "user@nutech-integrasi.com"
 *                 first_name: "User Edited"
 *                 last_name: "Nutech Edited"
 *                 profile_image: "https://yoururlapi.com/profile.jpeg"
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
 *             example:
 *               status: 108
 *               message: "Token tidak tidak valid atau kadaluwarsa"
 *               data: null
 */

// Define the route handler (assuming you have a function to handle profile update)
router.put("/update", updateProfile);

module.exports = router;
