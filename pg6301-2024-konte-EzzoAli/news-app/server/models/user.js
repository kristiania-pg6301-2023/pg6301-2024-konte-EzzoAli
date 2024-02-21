// Import dependencies
import mongoose from 'mongoose';

// Define user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'editor', 'admin'], // Define user roles
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create user model
const User = mongoose.model('User', userSchema);

export default User;
