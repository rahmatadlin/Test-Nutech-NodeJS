// Import the necessary modules
const db = require("../config/db"); // Assuming you have a database configuration file

// Controller to get the list of banners from the database
exports.getBanners = async (req, res, next) => {
  try {
    // Query to get all banners from the database
    const [banners] = await db.query(
      "SELECT banner_name, banner_image, description FROM banners"
    );

    // If no banners are found, throw a NotFound error
    if (banners.length === 0) {
      throw { name: "NotFound" }; // Custom error for not found
    }

    // If banners are found, send a successful response
    return res.status(200).json({
      status: 0,
      message: "Sukses",
      data: banners, // send the array of banners
    });
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};
