// middlewares/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  // Log the token for debugging
  console.log('Received token:', token);

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({
      status: 108,
      message: 'Token tidak valid atau kadaluwarsa',
      data: null,
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Attach user ID to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Error occurred during token verification:', err);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 108,
        message: 'Token tidak valid atau kadaluwarsa',
        data: null,
      });
    }
    return res.status(500).json({
      status: 500,
      message: 'Server error',
      data: null,
    });
  }
};

module.exports = authenticateToken;
