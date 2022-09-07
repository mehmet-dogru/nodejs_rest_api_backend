const express = require("express");
const router = express.Router();

const productController = require("../contollers/product_controller");

router.get("/", productController.getAllProducts);

router.get("/:id", productController.productGetById);

router.post("/", productController.addProduct);

router.patch("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
