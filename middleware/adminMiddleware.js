const admin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      statusCode: 403,
      message: "Yönetici değilsiniz bu işlem gerçekleştirilemez!",
    });
  }
  next();
};

module.exports = admin;
