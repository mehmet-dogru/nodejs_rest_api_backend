const multer = require("multer");
const path = require("path");

const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "" + path.extname(file.originalname));
  },
});

const uploadImage = multer({
  storage: myStorage,
});

module.exports = uploadImage;
