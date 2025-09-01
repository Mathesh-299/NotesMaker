const mongoose = require("mongoose");

const DB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        console.log("DB error");
    }
}


module.exports = DB;