const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key"; // Move this to .env for security

const authMiddleware = (req, res, next) => {
    // Get token from the request header
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        // Verify and decode token (remove "Bearer " prefix if present)
        const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
        req.user = decoded; // Add user details to request object
        next(); // Proceed to the next middleware or route
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
