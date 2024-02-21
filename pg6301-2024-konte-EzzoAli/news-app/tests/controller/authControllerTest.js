// Import dependencies
import authController from '../../server/controllers/authController';
import User from '../../server/models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../server/config';

// Mock dependencies
jest.mock('../models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

// Mock user data
const mockUser = {
    _id: 'mockUserId',
    username: 'mockUser',
    email: 'mock@example.com',
    password: 'mockPasswordHash'
};

describe('authController loginUser', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    it('should successfully authenticate a user and return a JWT token', async () => {
        // Mock request body
        const req = {
            body: {
                email: 'mock@example.com',
                password: 'mockPassword'
            }
        };

        // Mock User.findOne to return the mock user
        User.findOne.mockResolvedValueOnce(mockUser);

        // Mock bcrypt.compare to return true
        bcrypt.compare.mockResolvedValueOnce(true);

        // Mock jwt.sign to return a mock token
        jwt.sign.mockReturnValueOnce('mockToken');

        // Mock res.json
        const jsonMock = jest.fn();
        const res = { json: jsonMock };

        // Call the loginUser method
        await authController.loginUser(req, res);

        // Expectations
        expect(User.findOne).toHaveBeenCalledWith({ email: 'mock@example.com' });
        expect(bcrypt.compare).toHaveBeenCalledWith('mockPassword', 'mockPasswordHash');
        expect(jwt.sign).toHaveBeenCalledWith({ id: 'mockUserId' }, config.jwtSecret, { expiresIn: '1h' });
        expect(res.json).toHaveBeenCalledWith({ token: 'mockToken' });
    });

    it('should return an error if user is not found', async () => {
        // Mock request body
        const req = {
            body: {
                email: 'mock@example.com',
                password: 'mockPassword'
            }
        };

        // Mock User.findOne to return null
        User.findOne.mockResolvedValueOnce(null);

        // Mock res.status and res.json
        const statusMock = jest.fn().mockReturnValueOnce({ json: jest.fn() });
        const res = { status: statusMock };

        // Call the loginUser method
        await authController.loginUser(req, res);

        // Expectations
        expect(User.findOne).toHaveBeenCalledWith({ email: 'mock@example.com' });
        expect(statusMock).toHaveBeenCalledWith(404);
        expect(res.status().json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    // Add more test cases for other scenarios (invalid password, missing credentials, server error, etc.)
});
