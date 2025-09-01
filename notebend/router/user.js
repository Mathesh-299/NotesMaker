const express = require("express");
const { register, verifyOtp, login, resendOTP, verifyOtpLogin } = require("../controller/authController");
const { Authorization } = require("../Auth/Authorization");

const router = express.Router();


router.post("/register", register);
router.post("/otpPost", verifyOtp);
router.post("/resendOTP", resendOTP);
router.post("/login", login)
router.post("/verifyOtpLogin", verifyOtpLogin)

module.exports = router;