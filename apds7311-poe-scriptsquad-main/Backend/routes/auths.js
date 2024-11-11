const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

/**
 * Middleware to verify the JWT token and check if the user has an "admin" role.
 * The token is expected to be in the format: "Bearer <token>".
 */
const verifyAdmin = (req, res, next) => {
    // Extract the token from the Authorization header (format: "Bearer <token>")
    const token = req.headers.authorization?.split(" ")[1]; 

    // If no token is provided, return a 401 Unauthorized response
    if (!token) {
        return res.status(401).json({ error: 'Authorization token is required' });
    }

    try {
        // Verify the JWT token using the secret stored in the environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user has the 'admin' role
        if (decoded.role !== 'admin') {
            // If the user is not an admin, return a 403 Forbidden response
            return res.status(403).json({ error: 'User does not have the required admin role' });
        }

        // If the user is an admin, allow the request to proceed to the next middleware or route handler
        next();
    } catch (err) {
        // If there is an error during token verification (e.g., invalid or expired token), return a 401 Unauthorized response
        console.error('Token verification error:', err);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

// Define a protected route that requires admin role for access
router.get('/checkAdmin', verifyAdmin, (req, res) => {
    // If the middleware allows the request to proceed, return a success message
    res.status(200).json({ message: 'Authorized' });
});

// Export the router so it can be used in the main server file
module.exports = router;
