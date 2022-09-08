const errorHandling = (err, req, res, next) => {
  /*if (err.name === "CastError") {
    res.json({
      message: "Please enter a valid id",
    });
  } else {
    res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
    });
  }*/
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
  });
};

module.exports = errorHandling;
