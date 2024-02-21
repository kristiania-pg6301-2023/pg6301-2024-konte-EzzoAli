// Import dependencies
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";

// Controller for user authentication
const authController = {
    // Login user
    loginUser: async (req, res) => {
        try {
            // Extract email and password from request body
            const { email, password } = req.body;

            // Check if email and password are provided
            if (!email || !password) {
                return res.status(400).json({ error: 'Please provide email and password' });
            }

            // Find user by email
            const user = await User.findOne({ email });

            // Check if user exists
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Validate password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid password' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });

            // Send token in response
            res.json({ token });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Server error' });
        }
    }
};


export default authController;
