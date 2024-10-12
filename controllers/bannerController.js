// Import the necessary modules
const db = require('../config/db'); // Assuming you have a database configuration file

// Controller to get the list of banners from the database
exports.getBanners = async (req, res) => {
  try {
    // Query to get all banners from the database
    const banners = await db.query('SELECT banner_name, banner_image, description FROM banners');

    // If banners are found, send a successful response
    return res.status(200).json({
      status: 0,
      message: 'Sukses',
      data: banners[0], // assuming banners[0] contains the array of banners
    });
  } catch (error) {
    // Handle database or server errors
    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      data: null,
    });
  }
};
