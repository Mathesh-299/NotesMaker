import { LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const loginStatus = localStorage.getItem("LoggedIn") === "true";
        setIsLoggedIn(loginStatus)
    })
    const handleLogout = () => {
        localStorage.setItem("LoggedIn", "false");
        setIsLoggedIn(false);
        toast.success("Logout")
        navigate('/');
    };
    const base =
        "px-4 py-2 rounded-2xl text-sm md:text-base font-semibold transition inline-flex items-center";
    const active =
        "bg-[#7A7A7A] text-[#F7F4EF] shadow-[0_6px_0_0_rgba(0,0,0,0.15)]";
    const inactive =
        "text-[#7A7A7A] hover:text-[#F7F4EF]";
    // console.log(isLoggedIn)
    return (
        <nav className="bg-[#CFC8BB] sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
                <NavLink to="/" className="text-2xl font-bold">
                    NoteCraft
                </NavLink>

                <div className="hidden md:flex gap-4 items-center">
                    <NavLink to="/" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
                        Home
                    </NavLink>
                    <NavLink to="/notes" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
                        Notes
                    </NavLink>

                    {isLoggedIn ? (
                        <>
                            <NavLink to="/create" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
                                Create
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className={`${base} flex items-center gap-2 bg-[#F7F4EF] text-[#7A7A7A] hover:bg-[#e9e6e0]`}
                            >
                                <LogOut className="w-5 h-5" /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={`${base} flex items-center gap-2`}>
                                <User className="w-5 h-5" /> Login
                            </NavLink>
                            <NavLink to="/signup" className={`${base} bg-[#F7F4EF] text-[#7A7A7A] hover:bg-[#e9e6e0]`}>
                                Sign Up
                            </NavLink>
                        </>
                    )}
                </div>
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? "✕" : "☰"}
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-[#CFC8BB] px-4 pt-2 pb-4 space-y-2 shadow-lg">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `${base} block w-full ${isActive ? active : inactive}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/notes"
                        className={({ isActive }) => `${base} block w-full ${isActive ? active : inactive}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        Notes
                    </NavLink>

                    {isLoggedIn && (
                        <NavLink
                            to="/create"
                            className={({ isActive }) => `${base} block w-full ${isActive ? active : inactive}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            Create
                        </NavLink>
                    )}

                    {isLoggedIn ? (
                        <button
                            onClick={() => {
                                handleLogout();
                                setMenuOpen(false);
                            }}
                            className={`${base} block w-full gap-2 bg-[#F7F4EF] text-[#7A7A7A] hover:bg-[#e9e6e0]`}
                        >
                            <LogOut className="w-5 h-5" /> Logout
                        </button>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) => `${base} block w-full gap-2 ${isActive ? active : inactive}`}
                                onClick={() => setMenuOpen(false)}
                            >
                                <User className="w-5 h-5" /> Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className={({ isActive }) =>
                                    `${base} block w-full ${isActive ? active : "bg-[#F7F4EF] text-[#7A7A7A] hover:bg-[#e9e6e0]"}`
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                Sign Up
                            </NavLink>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
