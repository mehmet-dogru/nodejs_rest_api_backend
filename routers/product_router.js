const express = require("express");
const router = express.Router();
const multerConfig = require("../config/multer_config");

const productController = require("../contollers/product_controller");

router.get("/", productController.getAllProducts);

router.get("/:id", productController.productGetById);

router.post("/", productController.addProduct);

router.post("/upload", multerConfig.single("image"), (req, res) => {
  return res.send({ name: req.file.filename });
});

router.patch("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
