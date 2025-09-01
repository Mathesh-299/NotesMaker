import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./asserts/Components/Navbar";

import Create from "./asserts/Pages/Create";
import Home from "./asserts/Pages/Home";
import Login from "./asserts/Pages/Login";
import Notes from "./asserts/Pages/Notes";
import { Register } from "./asserts/Pages/Register";
const App = () => {
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </>
    )
}

export default App