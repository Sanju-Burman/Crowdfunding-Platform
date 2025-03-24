const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) return res.status(401).json({ error: "Access denied, token require" });
    const token = header.split(' ')[1];// Extract token from "Bearer <token>"
    try {
        
        jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'Token expired' });
                }
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}
const donorChecks = (req, res, next) => {
    if (req.user && req.user.role.toLowerCase() === 'donor') {
        next();
    } else {
        res.status(403).json({ message: 'donor access required' });
    }
};
module.exports = { verifyToken, donorChecks };