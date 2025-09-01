import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import API from "../API/api";

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [step, setStep] = useState("form");
    const [form, setForm] = useState({ username: "", email: "", dateOfBirth: "" });
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(0);

    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSignup = async (e) => {
        e.preventDefault();
        const { email, username, dateOfBirth } = form;
        if (!email || !username || !dateOfBirth) {
            toast.warn("Please fill all fields!!!");
            return;
        }
        setLoading(true);
        try {
            const response = await API.post("/user/register", form);
            if (response.status === 200 || response.status === 201) {
                setStep("otp");
                startTimer(30);
                toast.success("OTP sent to your email!");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong, please try again");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        const { email } = form;
        if (!email || !otp) {
            toast.warn("Please fill all the fields");
            return;
        }

        setOtpLoading(true);
        try {
            const data = { email, otp };
            const response = await API.post("/user/otpPost", data);
            toast.success("Account verified successfully!");
            navigate("/login");
            console.log(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid OTP, please try again");
        } finally {
            setOtpLoading(false);
        }
    };

    const handleResend = async (e) => {
        e.preventDefault();
        const { email } = form;
        setResendLoading(true);
        try {
            await API.post("/user/resendOTP", { email });
            setOtp("");
            startTimer(30);
            toast.success("OTP resent successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to resend OTP");
        } finally {
            setResendLoading(false);
        }
    };

    const startTimer = (seconds) => {
        setTimer(seconds);
        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-br from-[#ECECEC] to-[#D9D9D9] px-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 tracking-wide">
                    Sign Up
                </h2>
                <p className="text-center text-sm text-gray-500 mt-2">
                    Create your account in just a few steps
                </p>

                {step === "form" && (
                    <form onSubmit={handleSignup} className="mt-8 space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="User Name"
                                value={form.username}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gray-700 focus:ring-2 focus:ring-gray-500 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={form.dateOfBirth}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gray-700 focus:ring-2 focus:ring-gray-500 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="example@email.com"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gray-700 focus:ring-2 focus:ring-gray-500 transition"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center bg-gray-800 text-white py-3 rounded-lg font-semibold tracking-wide shadow-md hover:bg-black transition disabled:opacity-70"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "Continue"
                            )}
                        </button>
                    </form>
                )}

                {step === "otp" && (
                    <div>
                        <form onSubmit={handleVerifyOtp} className="mt-8 space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Enter OTP
                                </label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={4}
                                    placeholder="____"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
                                    className="w-full tracking-[1em] text-center text-xl font-bold px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gray-700 focus:ring-2 focus:ring-gray-500 transition"
                                    autoFocus
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={otpLoading}
                                className="w-full flex items-center justify-center bg-gray-800 text-white py-3 rounded-lg font-semibold tracking-wide shadow-md hover:bg-black transition disabled:opacity-70"
                            >
                                {otpLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    "Verify Account"
                                )}
                            </button>

                            {timer > 0 ? (
                                <p className="text-center">Resend OTP in {timer}s</p>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={resendLoading}
                                    className="text-blue-600 hover:underline font-semibold flex items-center justify-center w-full"
                                >
                                    {resendLoading ? (
                                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        "Resend OTP"
                                    )}
                                </button>
                            )}
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
