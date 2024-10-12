const db = require('../config/db');
const bcrypt = require('bcryptjs');

// User registration
exports.registration = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).json({
      status: 102,
      message: 'Parameter email harus diisi',
      data: null
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: 102,
      message: 'Parameter email tidak sesuai format',
      data: null
    });
  }

  // Check if first_name is provided
  if (!first_name) {
    return res.status(400).json({
      status: 102,
      message: 'Parameter first_name harus diisi',
      data: null
    });
  }

  // Check if last_name is provided
  if (!last_name) {
    return res.status(400).json({
      status: 102,
      message: 'Parameter last_name harus diisi',
      data: null
    });
  }

  // Check if password is provided
  if (!password) {
    return res.status(400).json({
      status: 102,
      message: 'Parameter password harus diisi',
      data: null
    });
  }

  // Password length validation (minimum 8 characters)
  if (password.length < 8) {
    return res.status(400).json({
      status: 102,
      message: 'Password length minimal 8 karakter',
      data: null
    });
  }

  try {
    // Check if email already exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({
        status: 102,
        message: 'Email sudah terdaftar',
        data: null
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await db.query('INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', [
      first_name,
      last_name,
      email,
      hashedPassword,
    ]);

    res.status(201).json({
      status: 0,
      message: 'Registrasi berhasil silahkan login',
      data: null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: 'Server error',
      data: null
    });
  }
};
