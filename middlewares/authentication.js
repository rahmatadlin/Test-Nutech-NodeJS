const { verifyToken } = require('../helpers/jwt');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({
      status: 108,
      message: 'Token tidak valid atau kadaluwarsa',
      data: null,
    });
  }

  try {
    // Verify the token using helper
    const decoded = verifyToken(token);
    req.userId = decoded.id; // Attach user ID to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {

    // Handle different JWT errors
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 108,
        message: 'Token tidak valid atau kadaluwarsa',
        data: null,
      });
    } else if (err.name === 'JsonWebTokenError' || err.name === 'NotBeforeError') {
      // Handle invalid or malformed tokens
      return res.status(401).json({
        status: 108,
        message: 'Token tidak valid atau kadaluwarsa',
        data: null,
      });
    }
  }
};

module.exports = authenticateToken;
