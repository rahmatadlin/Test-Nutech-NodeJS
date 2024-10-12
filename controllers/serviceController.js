const db = require('../config/db'); // Assuming you have a DB connection module

// Controller for fetching services
const getServices = async (req, res) => {
  try {
    // Query to fetch services from the database
    const query = `SELECT service_code, service_name, service_icon, service_tariff FROM Services`;
    const [rows] = await db.execute(query);

    // If services are found
    if (rows.length > 0) {
      return res.status(200).json({
        status: 0,
        message: "Sukses",
        data: rows,
      });
    } else {
      // If no services are found
      return res.status(200).json({
        status: 0,
        message: "Tidak ada layanan yang tersedia",
        data: [],
      });
    }
  } catch (error) {
    // Handle any server error
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
};

module.exports = {
  getServices,
};
