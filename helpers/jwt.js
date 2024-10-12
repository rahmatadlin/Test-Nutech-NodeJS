const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const createToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: "1h", algorithm: 'HS256' });
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { createToken, verifyToken };
