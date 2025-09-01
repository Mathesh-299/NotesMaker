const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    },
    dateOfBirth: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
