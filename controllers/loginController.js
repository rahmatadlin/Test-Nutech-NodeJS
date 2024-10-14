const db = require("../config/db");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      throw { name: "EmptyEmail" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw { name: "EmailFormat" };
    }

    if (!password) {
      throw { name: "EmptyPassword" };
    }

    const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (rows.length === 0) {
      throw { name: "WrongEmailPassword" };
    }

    const user = rows[0];

    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      throw { name: "WrongEmailPassword" };
    }

    const token = createToken({ id: user.id });

    res.status(200).json({
      status: 0,
      message: "Login Sukses",
      data: {
        token: token,
      },
    });
  } catch (err) {
    next(err);
  }
};
