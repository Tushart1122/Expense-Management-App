const express = require("express");
const registerController = require("../controllers/RegisterControllers");
const loginController = require("../controllers/LoginControllers");
const forgotPasswordController = require("../controllers/ForgotPasswordControllers");
const resetPasswordController = require("../controllers/ResetPasswordControllers");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);

module.exports = router;
