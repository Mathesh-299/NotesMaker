
import axios from "axios";

const API = axios.create({
    baseURL: "https://note-craft-dt8t.onrender.com/api",
});

export default API;
