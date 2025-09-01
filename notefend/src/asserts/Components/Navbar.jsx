import { LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const base =
        "px-4 py-2 rounded-2xl text-sm md:text-base font-semibold transition inline-flex items-center";
    const active =
        "bg-[#7A7A7A] text-[#F7F4EF] shadow-[0_6px_0_0_rgba(0,0,0,0.15)]";
    const inactive =
        "text-[#7A7A7A] hover:text-[#F7F4EF]";

    useEffect(() => {
        const checkLoggedIn = () => {
            setLoggedIn(localStorage.getItem("LoggedIn") === "true");
        };

        checkLoggedIn();
        window.addEventListener("storage", checkLoggedIn);

        return () => window.removeEventListener("storage", checkLoggedIn);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("LoggedIn");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setLoggedIn(false);
        navigate("/");
    };

    return (
        <nav className="bg-[#CFC8BB] sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <NavLink
                        to="/"
                        className="text-[#7A7A7A] text-2xl font-extrabold tracking-wide"
                    >
                        NoteCraft 
                    </NavLink>

                    <div className="hidden md:flex items-center gap-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `${base} ${isActive ? active : inactive}`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/notes"
                            className={({ isActive }) =>
                                `${base} ${isActive ? active : inactive}`
                            }
                        >
                            Notes
                        </NavLink>

                        {loggedIn && (
                            <NavLink
                                to="/create"
                                className={({ isActive }) =>
                                    `${base} ${isActive ? active : inactive}`
                                }
                            >
                                Create
                            </NavLink>
                        )}

                        {loggedIn ? (
                            <button
                                onClick={handleLogout}
                                className={`${base} gap-2 bg-[#F7F4EF] text-[#7A7A7A] hover:bg-[#e9e6e0]`}
                            >
                                <LogOut className="w-5 h-5" /> Logout
                            </button>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        `${base} gap-2 ${isActive ? active : inactive}`
                                    }
                                >
                                    <User className="w-5 h-5" /> Login
                                </NavLink>
                                <NavLink
                                    to="/signup"
                                    className={({ isActive }) =>
                                        `${base} ${isActive ? active : "bg-[#F7F4EF] text-[#7A7A7A] hover:bg-[#e9e6e0]"}`
                                    }
                                >
                                    Sign Up
                                </NavLink>
                            </>
                        )}
                    </div>
                    <button
                        className="md:hidden text-[#7A7A7A] text-2xl"
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {open ? "✕" : "☰"}
                    </button>
                </div>
            </div>
            {open && (
                <div className="md:hidden bg-[#CFC8BB] px-4 pt-2 pb-4 space-y-2 shadow-lg">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${base} block w-full ${isActive ? active : inactive}`
                        }
                        onClick={() => setOpen(false)}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/notes"
                        className={({ isActive }) =>
                            `${base} block w-full ${isActive ? active : inactive}`
                        }
                        onClick={() => setOpen(false)}
                    >
                        Notes
                    </NavLink>

                    {loggedIn && (
                        <NavLink
                            to="/create"
                            className={({ isActive }) =>
                                `${base} block w-full ${isActive ? active : inactive}`
                            }
                            onClick={() => setOpen(false)}
                        >
                            Create
                        </NavLink>
                    )}

                    {loggedIn ? (
                        <button
                            onClick={() => {
                                handleLogout();
                                setOpen(false);
                            }}
                            className={`${base} block w-full gap-2 bg-[#F7F4EF] text-[#7A7A7A] hover:bg-[#e9e6e0]`}
                        >
                            <LogOut className="w-5 h-5" /> Logout
                        </button>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `${base} block w-full gap-2 ${isActive ? active : inactive}`
                                }
                                onClick={() => setOpen(false)}
                            >
                                <User className="w-5 h-5" /> Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className={({ isActive }) =>
                                    `${base} block w-full ${isActive ? active : "bg-[#F7F4EF] text-[#7A7A7A] hover:bg-[#e9e6e0]"}`
                                }
                                onClick={() => setOpen(false)}
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
