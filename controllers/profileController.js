// controllers/profile.js
const db = require("../config/db");
const path = require("path");

// Get user profile
exports.getProfile = async (req, res) => {
  const userId = req.userId; // Mendapatkan ID pengguna dari middleware

  // Mengambil profil pengguna dari database
  const [rows] = await db.query(
    "SELECT email, first_name, last_name, profile_image FROM users WHERE id = ?",
    [userId]
  );

  // Memeriksa apakah pengguna ada
  if (rows.length === 0) {
    throw { name: "NotFound" }; // Throwing custom error
  }

  const userProfile = rows[0];

  // Mengirim respons dengan data profil pengguna
  res.status(200).json({
    status: 0,
    message: "Sukses",
    data: userProfile,
  });
};

// Update user profile
exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.userId; // Get user ID from request after token validation in middleware

    // Get data from request body
    const { first_name, last_name } = req.body;

    // Validate first_name and last_name
    if (!first_name) {
      throw { name: "EmptyFirstName" };
    }

    if (!last_name) {
      throw { name: "EmptyLastName" };
    }

    // First, select the user's email from the database
    const [userRows] = await db.query("SELECT email FROM users WHERE id = ?", [
      userId,
    ]);

    if (userRows.length === 0) {
      throw { name: "NotFound" }; // User not found
    }

    const email = userRows[0].email; // Get the user's email

    // Update data in the database, including profile_image
    const profileImage = "https://yoururlapi.com/profile.jpeg"; // New profile image URL
    const updateQuery = `UPDATE users SET first_name = ?, last_name = ?, profile_image = ? WHERE id = ?`;
    const result = await db.query(updateQuery, [
      first_name,
      last_name,
      profileImage,
      userId,
    ]);

    if (result.affectedRows === 0) {
      throw { name: "NotFound" }; // User not found
    }

    // User data after update
    const updatedUser = {
      email, // Include email from the database
      first_name,
      last_name,
      profile_image: profileImage, // Set profile image URL
    };

    // Successful response
    return res.status(200).json({
      status: 0,
      message: "Update Profile berhasil",
      data: updatedUser,
    });
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

// Upload profile image
exports.uploadProfileImage = async (req, res, next) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      throw { name: "EmptyFile" }; // Throw error if no file is uploaded
    }

    // Validate file format
    const ext = path.extname(req.file.originalname).toLowerCase();
    if (ext !== ".png" && ext !== ".jpeg") {
      throw { name: "InvalidImageFormat" }; // Throw error for invalid format
    }

    // Get user ID from request after token validation in middleware
    const userId = req.userId;
    const profileImageUrl = `https://yoururlapi.com/${req.file.filename}`; // Update this based on the actual image URL

    // Update profile image URL in the database
    const updateQuery = `UPDATE users SET profile_image = ? WHERE id = ?`;
    const result = await db.query(updateQuery, [profileImageUrl, userId]);

    // Check if the update was successful
    if (result.affectedRows === 0) {
      throw { name: "NotFound" }; // User not found
    }

    // Respond with updated profile information
    return res.status(200).json({
      status: 0,
      message: "Update Profile Image berhasil",
      data: {
        profile_image: profileImageUrl,
      },
    });
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};
