const express = require("express");
const router = express.Router();
const multerConfig = require("../config/multer_config");
const Product = require("../models/Product");
const productController = require("../contollers/product_controller");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", [authMiddleware], productController.getAllProducts);

router.get("/:id", [authMiddleware], productController.productGetById);

router.post("/", [authMiddleware], multerConfig.single("image"), productController.addProduct);

router.patch("/:id",[authMiddleware], multerConfig.single("image"), productController.updateProduct);

router.delete("/:id", [authMiddleware], productController.deleteProduct);

module.exports = router;
