const db = require('../config/db'); // Assuming you have a DB connection module

// Controller for fetching services
const getServices = async (req, res, next) => {
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
      // If no services are found, throw a custom error
      throw { name: "NotFound" }; // Custom error for no services found
    }
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

module.exports = {
  getServices,
};
