const User = require("../model/User");
const sendingOTPEmail = require("../utils/mailder");
const jwttoken = require("jsonwebtoken");
const generateOTP = async () => {
    const otpValue = Math.floor(1000 + Math.random() * 9000);
    return otpValue;
}

const expiryOTP = async () => {
    const otpExpiryValue = new Date(Date.now() + 5 * 60 * 1000);
    return otpExpiryValue;
}


exports.register = async (req, res) => {
    const { username, email, dateOfBirth } = req.body;

    try {
        const userfound = await User.findOne({ username });
        const useremail = await User.findOne({ email });
        if (userfound) {
            return res.status(401).json({ message: "Username already exists", status: "Failed" });
        }
        if (useremail) {
            return res.status(401).json({ message: "Email already exists", status: "Failed" });
        }
        const otp = await generateOTP();
        const otpExpiry = await expiryOTP();

        const newUser = new User({ username, email, dateOfBirth, otp, otpExpiry, isVerified: false });

        await newUser.save();
        await sendingOTPEmail(email, otp);
        res.status(201).json({ email, message: "OTP sent to email", status: "Pending" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", status: "Failed" });
    }
}


exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Email not found", status: "Failed" });
        }
        if (!user.otp) {
            return res.status(403).json({ message: "No OTP found. Please request a new OTP.", status: "Failed" });
        }
        if (user.otp !== otp) {
            return res.status(402).json({ message: "Incorrect OTP", status: "Failed" });
        }
        if (new Date() > user.otpExpiry) {
            return res.status(400).json({ message: "OTP expired. Please resend the OTP", status: "Failed" });
        }
        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        return res.status(200).json({ message: "OTP verified successfully", status: "Success" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", status: "Failed" });
    }
};


exports.resendOTP = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", status: "Failed" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "Your account is already verified", status: "Failed" });
        }
        const otpValue = await generateOTP();
        const otpExpiryValue = await expiryOTP();

        user.otp = otpValue;
        user.otpExpiry = otpExpiryValue;
        await user.save();

        await sendingOTPEmail(email, otpValue);

        res.status(200).json({ message: "A new OTP has been sent to your email", status: "Pending" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", status: "Failed" });
    }
}


exports.login = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User name not found", status: "Failed" });
        }

        const otpValue = await generateOTP();
        const otpExpiryValue = await expiryOTP();

        user.otp = otpValue;
        user.otpExpiry = otpExpiryValue;
        await user.save();
        await sendingOTPEmail(email, otpValue);

        res.status(201).json({ email, message: "OTP sent to email", status: "Pending" });
    } catch (error) {
        res.status(501).json({ message: "Internal Server Error", status: "Failed" });
    }
}

exports.verifyOtpLogin = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found", status: "Failed" });
        }

        if (otp !== user.otp) {
            return res.status(400).json({ message: "OTP does not match! Please enter correct otp" });
        }

        if (new Date() > user.otpExpiry) {
            return res.status(400).json({ message: "OTP expired. Please resend the OTP", status: "Failed" });
        }


        const token = jwttoken.sign({ userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )
        user.otp = null;
        user.otpExpiry = null;
        await user.save();
        res.status(200).json({ token, user, message: "Successfully LoggedIn", status: "Success" });
    } catch (error) {
        res.status(501).json({ message: "Internal Server Error", status: "Failed" });
    }
}