const express = require('express');
const dotenv = require('dotenv');
const { swaggerDocs, swaggerUi } = require('./swagger'); // Import Swagger configuration
const authenticateToken = require('./middlewares/authentication.js'); // Import the authentication middleware

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Define routes
app.use('/', require('./routes/auth'));
app.use('/profile', authenticateToken, require('./routes/profile')); // Use middleware for profile route
app.use('/api/balance', require('./routes/balance'));
app.use('/api/topup', require('./routes/topUp'));
app.use('/api/transaction', require('./routes/transaction'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
