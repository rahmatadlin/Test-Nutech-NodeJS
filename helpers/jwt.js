const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

// Memuat variabel lingkungan dari file .env
dotenv.config();

const secretKey = process.env.SECRET_KEY; 

// Fungsi untuk membuat token JWT menggunakan payload yang diberikan
const createToken = (payload) => {
  // Menggunakan jwt.sign untuk membuat token, dengan payload dan secretKey
  return jwt.sign(payload, secretKey, { expiresIn: "1h", algorithm: "HS256" });
};

// Fungsi untuk memverifikasi token JWT yang diberikan
const verifyToken = (token) => {
  // Menggunakan jwt.verify untuk memverifikasi token dengan secretKey
  return jwt.verify(token, secretKey);
};

module.exports = { createToken, verifyToken };
