const db = require("../config/db");

exports.getBanners = async (req, res, next) => {
  try {
    const { rows: banners } = await db.query(
      "SELECT banner_name, banner_image, description FROM banners"
    );

    if (banners.length === 0) {
      throw { name: "NotFound" };
    }

    return res.status(200).json({
      status: 0,
      message: "Sukses",
      data: banners,
    });
  } catch (error) {
    next(error);
  }
};
