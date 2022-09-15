const express = require("express");
const router = express.Router();

const userController = require("../contollers/user_controller");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", [authMiddleware, adminMiddleware], userController.getUsers);

router.get("/me", authMiddleware, userController.getUserById);

router.post("/", userController.addUser);

router.post("/login", userController.loginProccess);

router.patch("/:id", userController.updateUser);

router.delete("/:id", [authMiddleware, adminMiddleware], userController.deleteUser);

module.exports = router;
