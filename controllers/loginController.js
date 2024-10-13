const db = require("../config/db");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

// User login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

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

    // Check if password is provided
    if (!password) {
      throw { name: "EmptyPassword" };
    }

    // Check if the user exists by email
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      throw { name: "WrongEmailPassword" };
    }

    const user = rows[0];

    // Check if the entered password is correct
    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      throw { name: "WrongEmailPassword" };
    }

    // Create a JWT token using helper function
    const token = createToken({ id: user.id });

    res.status(200).json({
      status: 0,
      message: "Login Sukses",
      data: {
        token: token,
      },
    });
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
};
