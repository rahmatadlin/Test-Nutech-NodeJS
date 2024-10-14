// controllers/profile.js
const db = require("../config/db");
const path = require("path");

// Get user profile
exports.getProfile = async (req, res, next) => {
  const userId = req.userId; // Mendapatkan ID pengguna dari middleware

  try {
    // Log userId for debugging purposes

    // Mengambil profil pengguna dari database
    const result = await db.query(
      "SELECT email, first_name, last_name, profile_image FROM users WHERE id = $1",
      [userId]
    );

    // Memeriksa apakah pengguna ada
    if (result.rows.length === 0) {
      throw { name: "NotFound" }; // Throwing custom error
    }

    const userProfile = result.rows[0];

    // Mengirim respons dengan data profil pengguna
    res.status(200).json({
      status: 0,
      message: "Sukses",
      data: userProfile,
    });
  } catch (error) {
    console.error("Error fetching profile:", error); // Log the error for debugging
    next(error); // Pass the error to the error handler
  }
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

    // First, select the user's existing data from the database
    const { rows: userRows } = await db.query(
      "SELECT email, profile_image FROM users WHERE id = $1",
      [userId]
    );

    if (userRows.length === 0) {
      throw { name: "NotFound" }; // User not found
    }

    const email = userRows[0].email; // Get the user's email
    const profileImage = userRows[0].profile_image; // Get the existing profile image

    // Update only first_name and last_name in the database
    const updateQuery = `UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3`;
    const result = await db.query(updateQuery, [
      first_name,
      last_name,
      userId,
    ]);

    if (result.rowCount === 0) {
      throw { name: "NotFound" }; // User not found
    }

    // User data after update
    const updatedUser = {
      email, // Include email from the database
      first_name,
      last_name,
      profile_image: profileImage, // Use the existing profile image
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
    const updateQuery = `UPDATE users SET profile_image = $1 WHERE id = $2`;
    const result = await db.query(updateQuery, [profileImageUrl, userId]);

    // Check if the update was successful
    if (result.rowCount === 0) {
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
