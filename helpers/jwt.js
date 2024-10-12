const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET || "your_jwt_secret_key";

const createToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: "1h", algorithm: "HS256" });
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { createToken, verifyToken };
