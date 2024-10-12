const express = require("express");
const dotenv = require("dotenv");
const { swaggerDocs, swaggerUi } = require("./swagger"); // Import Swagger configuration
const authenticateToken = require("./middlewares/authentication.js"); // Import the authentication middleware
const { handleJsonParsingError } = require("./middlewares/errorHandler"); // Import JSON parsing error handler

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Use JSON parsing error handler middleware
app.use(handleJsonParsingError);

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Define routes
app.use("/", require("./routes/auth"));
app.use("/profile", authenticateToken, require("./routes/profile"));
app.use("/banner", require("./routes/banner"));
app.use("/services", authenticateToken, require("./routes/services")); // Cek semua services yang ada
app.use("/balance", authenticateToken, require("./routes/balance")); // Cek balance akun user yang telah login dan ada token
app.use("/topup", authenticateToken, require("./routes/topUp.js")); // Top up balance / saldo dari User
app.use("/transaction", authenticateToken, require("./routes/transaction"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
