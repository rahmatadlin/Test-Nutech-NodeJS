// const mysql = require('mysql2/promise');
// const dotenv = require('dotenv');

// // Load environment variables from .env file
// dotenv.config();

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT || 3306
// });


// module.exports = pool;


const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Gunakan connection string dari .env
  ssl: {
    rejectUnauthorized: false // Diperlukan jika menggunakan Vercel dan database cloud
  }
});

// Test connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Connected to PostgreSQL via Vercel');
    release();
  }
});


module.exports = pool;


