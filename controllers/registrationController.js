const db = require('../config/db');
const { hashPassword } = require('../helpers/bcrypt');

exports.registration = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    if (!email) {
      throw { name: "EmptyEmail" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw { name: "EmailFormat" };
    }

    if (!first_name) {
      throw { name: "EmptyFirstName" };
    }

    if (!last_name) {
      throw { name: "EmptyLastName" };
    }

    if (!password) {
      throw { name: "EmptyPassword" };
    }

    if (password.length < 8) {
      throw { name: "PasswordLength" };
    }

    const { rows: existingUser } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.length > 0) {
      throw { name: "ExistedEmail" };
    }

    const hashedPassword = hashPassword(password);

    await db.query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)', [
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
    next(err);
  }
};
