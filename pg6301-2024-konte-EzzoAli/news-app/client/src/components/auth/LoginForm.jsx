import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleGoogleLogin = async () => {
        try {
            // Redirect user to Google authentication page
            window.location.href = '/api/auth/google';
        } catch (error) {
            console.error('Google login failed:', error);
            setError('Google login failed. Please try again.');
        }
    };

    const handleGitHubLogin = async () => {
        try {
            // Redirect user to GitHub authentication page
            window.location.href = '/api/auth/github';
        } catch (error) {
            console.error('GitHub login failed:', error);
            setError('GitHub login failed. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/auth/login', { email, password });
            console.log('Login successful:', response.data);
            // Handle successful login (e.g., redirect user)
        } catch (error) {
            console.error('Login failed:', error.response.data);
            setError(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <div>
                <button onClick={handleGoogleLogin}>Login with Google</button>
                <button onClick={handleGitHubLogin}>Login with GitHub</button>
            </div>
        </div>
    );
};

export default LoginForm;
