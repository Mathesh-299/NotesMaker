const express = require("express");
const { register, verifyOtp, login, resendOTP } = require("../controller/authController");
const { Authorization } = require("../Auth/Authorization");

const router = express.Router();


router.post("/register", register);
router.post("/otpPost", verifyOtp);
router.post("/resendOTP", resendOTP);
router.post("/login", login)

module.exports = router;