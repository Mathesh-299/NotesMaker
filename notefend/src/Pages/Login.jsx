import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../API/api";
const Login = () => {
    const [step, setStep] = useState("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [timer, setTimer] = useState(30);
    const navigate = useNavigate();

    useEffect(() => {
        if (step === "otp" && timer > 0) {
            const interval = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [step, timer]);

    const handleContinue = async (e) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        try {
            const response = await API.post("/user/login", { email });
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                setTimeout(() => {
                    setStep("otp");
                    setTimer(30);
                }, 1500);
            }
            toast.success("OTP sent to your email!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong, please try again");
        } finally {
            setLoading(false);
        }

    };

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!email || !otp) {
            toast.warn("Please fill all the fields");
            return;
        }
        setOtpLoading(true);
        try {
            const data = { email, otp };
            const response = await API.post("/user/verifyOtpLogin", data);
            if (response.status === 200 || response.status === 201) {
                toast.success("Account verified successfully!");
                setOtp("");
                localStorage.setItem("LoggedIn", "true");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));

                console.log(response.data);
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid OTP, please try again");
        } finally {
            setOtpLoading(false);
        }
    };


    const handleResend = async (e) => {
        e.preventDefault();
        // const { email } = form;
        setResendLoading(true);
        try {
            const response = await API.post("/user/resendOTP", email);
            console.log(response);
            setOtp("");
            setTimer(30);
            startTimer();
            toast.success("OTP resent successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to resend OTP");
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-2rem)] flex items-center justify-center bg-[#c5c9d37a] px-4 sm:px-6 md:px-8">
            <div className="bg-white/90 p-6 sm:p-8 md:p-10 rounded-xl w-full max-w-md border border-gray-200 shadow-sm transition-all hover:shadow-md">
                <div className="bg-gray-800 text-white rounded-xl p-4 shadow-md">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center tracking-wide">
                        Login
                    </h2>
                    <p className="text-center text-sm sm:text-base mt-2">
                        Access your account easily
                    </p>
                </div>
                {step === "email" ? (
                    <form onSubmit={handleContinue} className="mt-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl shadow-sm 
                                focus:ring-2 focus:ring-gray-800 focus:border-gray-800 
                                text-gray-800 text-sm sm:text-base transition-all duration-300 
                                hover:shadow-md hover:border-gray-700"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold 
                                text-sm sm:text-base shadow-md hover:bg-black hover:scale-105 
                                transform transition duration-300 flex items-center justify-center 
                                disabled:opacity-60"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "Continue"
                            )}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerify} className="mt-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Enter OTP
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={4}
                                placeholder="____"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
                                autoFocus
                                className="w-full text-center tracking-[1em] text-lg font-semibold px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#1E40AF] focus:border-[#1E40AF] transition duration-300 ease-in-out hover:shadow-md"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={otpLoading}
                            className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold 
                            text-sm sm:text-base shadow-md hover:bg-black hover:scale-105 
                            transform transition duration-300 flex items-center justify-center 
                            disabled:opacity-60"
                        >
                            {otpLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "Verify OTP"
                            )}
                        </button>

                        <div className="text-center mt-3 text-sm sm:text-base">
                            {timer > 0 ? (
                                <span className="text-gray-500">Resend OTP in {timer}s</span>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={resendLoading}
                                    className="text-[#1E40AF] font-medium hover:underline flex items-center justify-center w-full"
                                >
                                    {resendLoading ? (
                                        <div className="w-4 h-4 border-2 border-[#1E40AF] border-t-transparent rounded-full animate-spin mx-auto"></div>
                                    ) : (
                                        "Resend OTP"
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                )}
                <div className="mt-8">
                    <div className="relative flex items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-3 text-gray-600 text-sm">New here?</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>
                    <p className="mt-4 text-center text-sm text-gray-900 font-bold">
                        Don’t have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-gray-800 font-semibold hover:underline hover:text-black transition-colors duration-300"
                        >
                            Create one
                        </Link>
                    </p>
                </div>


            </div>
        </div>
    );
};

export default Login;

