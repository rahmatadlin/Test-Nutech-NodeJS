const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Mendapatkan token dari header 'Authorization'
  const authHeader = req.header('Authorization');

  // Cek apakah ada token
  if (!authHeader) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  // Memisahkan 'Bearer' dari token yang sebenarnya
  const token = authHeader.split(' ')[1];

  // Cek apakah token ada setelah 'Bearer'
  if (!token) {
    return res.status(401).json({ error: 'Authorization format is Bearer <token>' });
  }

  try {
    // Verifikasi token menggunakan JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Menyimpan informasi pengguna yang ter-decode ke dalam req.user
    req.user = decoded;

    // Lanjut ke middleware berikutnya
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};
