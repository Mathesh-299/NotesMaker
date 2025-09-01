import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar";
import Create from "./Pages/Create";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Notes from "./Pages/Notes";
import Register from "./Pages/Register";

const App = () => {
    return (
        <>
            <Navbar />
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
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