const db = require('../config/db');
const { hashPassword } = require('../helpers/bcrypt');

// User registration
exports.registration = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    // Check if email is provided
    if (!email) {
      throw { name: "EmptyEmail" };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw { name: "EmailFormat" };
    }

    // Check if first_name is provided
    if (!first_name) {
      throw { name: "EmptyFirstName" };
    }

    // Check if last_name is provided
    if (!last_name) {
      throw { name: "EmptyLastName" };
    }

    // Check if password is provided
    if (!password) {
      throw { name: "EmptyPassword" };
    }

    // Password length validation (minimum 8 characters)
    if (password.length < 8) {
      throw { name: "PasswordLength" };
    }

    // Check if email already exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      throw { name: "ExistedEmail" };
    }

    // Hash password using helper function
    const hashedPassword = hashPassword(password);

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
    next(err); // Pass the error to the error handler
  }
};
