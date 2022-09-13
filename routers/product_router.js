const express = require("express");
const router = express.Router();
const multerConfig = require("../config/multer_config");
const Product = require("../models/Product");

const productController = require("../contollers/product_controller");

router.get("/", productController.getAllProducts);

router.get("/:id", productController.productGetById);

router.post("/", multerConfig.single("image"), productController.addProduct);

router.patch("/:id", multerConfig.single("image"), productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
