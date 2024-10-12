const db = require("../config/db");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).json({
      status: 102,
      message: "Parameter email harus diisi",
      data: null,
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: 102,
      message: "Parameter email tidak sesuai format",
      data: null,
    });
  }

  if (!password) {
    return res.status(400).json({
      status: 102,
      message: "Parameter password tidak boleh kosong",
      data: null,
    });
  }

  try {
    // Check if the user exists by email
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({
        status: 103,
        message: "Username atau password salah",
        data: null,
      });
    }

    const user = rows[0];

    // Check if the entered password is correct
    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 103,
        message: "Username atau password salah",
        data: null,
      });
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
    console.error(err);
    res.status(500).json({
      status: 500,
      message: "Server error",
      data: null,
    });
  }
};
