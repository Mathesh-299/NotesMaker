const jwt = require("jsonwebtoken");

exports.Authorization = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(401).json({ message: "Token not valid" });
            req.user = user;
            next();
        });
    } catch {
        res.status(403).json({ message: "Invalid token" });
    }
};
