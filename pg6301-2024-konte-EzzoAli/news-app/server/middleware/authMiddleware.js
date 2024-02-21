// Import dependencies
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/user";

// Middleware function to authenticate requests
const authMiddleware = async (req, res, next) => {
    // Extract the token from the request headers
    const token = req.header('Authorization');

    // Check if token is missing
    if (!token) {
        return res.status(401).json({ error: 'Authorization token missing' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, config.jwtSecret);

        // Extract the user ID from the decoded token
        const userId = decoded.id;

        // Find the user based on the ID
        const user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Attach the user object to the request for further use
        req.user = user;

        // Proceed to the next middleware
        next();
    } catch (error) {
        // Handle invalid token errors
        return res.status(401).json({ error: 'Invalid token' });
    }
};


export default authMiddleware;
