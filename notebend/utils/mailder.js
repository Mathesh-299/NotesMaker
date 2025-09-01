const nodemailer = require("nodemailer");


const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const sendingOTPEmail = async (email, otp) => {
    await transport.sendMail({
        from: `"Note maker" <notemakerinfo@gmail.com>`,
        to: email,
        subject: "Your OTP for Registration",
        html: `<h2>Your otp is ${otp}</h2>`
    })
}


module.exports = sendingOTPEmail