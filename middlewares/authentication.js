const { verifyToken } = require("../helpers/jwt");

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  // Check if the token is provided
  if (!token) {
    throw { name: "Unauthorized" }; // Throw a custom error for missing token
  }

  try {
    // Verify the token using helper
    const decoded = verifyToken(token);
    req.userId = decoded.id; // Attach user ID to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // Handle different JWT errors by throwing custom errors
    if (err.name === "TokenExpiredError") {
      throw { name: "Unauthorized" }; // Reuse existing error handling for expired token
    } else if (
      err.name === "JsonWebTokenError" ||
      err.name === "NotBeforeError"
    ) {
      throw { name: "Unauthorized" }; // Reuse existing error handling for invalid tokens
    }

    // If some other error occurs, throw a general error
    throw { name: "ServerError" };
  }
};

module.exports = authenticateToken;
