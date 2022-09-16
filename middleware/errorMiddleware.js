const errorHandling = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.json({
      message: "Unique value",
      statusCode: err.statusCode,
    });
  }

  if (err.code === 66) {
    return res.json({
      message: "ID is immutable field, you can't change!",
      statusCode: 400,
    });
  }

  res.json({
    statusCode: err.statusCode || 500,
    message: err.message,
    success : false,
  });
};

module.exports = errorHandling;
