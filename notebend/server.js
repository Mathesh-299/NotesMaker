const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
require("dotenv").config();
const DB = require("./config/DB");

const port = process.env.PORT;
DB()
    .then(() => {
        app.listen(port, () => {
            console.log("DB Successfully connected");
            console.log(`"Server running port is:"${port}`);
        })
    })
    .catch(() => {
        console.log("DB error");
    })

app.use("/api/user", require("./router/user"))
