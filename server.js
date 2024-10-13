const express = require("express");
const dotenv = require("dotenv");
const { swaggerDocs, swaggerUi } = require("./swagger"); // Import Swagger configuration
const authenticateToken = require("./middlewares/authentication.js"); // Import the authentication middleware
const handleErrors = require("./middlewares/errorHandler"); // Import error handler

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Redirect root to /api-docs
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Define other routes
app.use("/auth", require("./routes/auth"));
app.use("/profile", authenticateToken, require("./routes/profile"));
app.use("/banner", require("./routes/banner")); // Public route
app.use("/services", authenticateToken, require("./routes/services"));
app.use("/balance", authenticateToken, require("./routes/balance"));
app.use("/topup", authenticateToken, require("./routes/topUp.js"));
app.use("/transaction", authenticateToken, require("./routes/transaction"));

// Use error handler middleware after all routes
app.use(handleErrors);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
