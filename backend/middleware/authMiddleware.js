const jwt = require('jsonwebtoken');

// Middleware to verify JWT token and attach user payload to request
const verifyToken = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// NEW: Middleware for Role Authorization
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // req.user is guaranteed to be set if verifyToken ran before this
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            // 403 Forbidden is the standard response for authenticated but unauthorized access
            return res.status(403).json({ msg: 'Access Denied: Insufficient Role Permissions' });
        }
        next();
    };
};

module.exports = { verifyToken, authorizeRoles };