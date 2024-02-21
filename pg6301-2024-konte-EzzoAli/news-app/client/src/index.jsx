import React from "react";
import ReactDOM from "react-dom/client"; // Correct import statement
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes
import axios from 'axios';
import HomePage from './pages/homePage/homePage';
import NewsPage from './pages/newsPage/newsPage';
import ProfilePage from './pages/profilePage/profilePage';
import Navbar from './components/navBar/NavBar';
import LoginForm from './components/auth/LoginForm';
import PrivateRoute from './components/auth/PrivateRoute';
import './App.css'; // Import CSS file

// Main App component
const App = () => {
    // State for storing user authentication status
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    // Function to check if user is authenticated
    const checkAuthStatus = async () => {
        try {
            // Send request to server to check authentication status
            const response = await axios.get('/api/auth/check-auth');
            setIsAuthenticated(response.data.isAuthenticated);
        } catch (error) {
            console.error('Error checking authentication status:', error);
        }
    };

    // Check authentication status on component mount
    React.useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <Router>
            <div className="app-container"> {/* Add a container for styling */}
                <Navbar isAuthenticated={isAuthenticated} />
                <div className="main-content"> {/* Add a container for main content */}
                    <Routes> {/* Wrap your routes inside <Routes> */}
                        {/* Public Routes */}
                        <Route exact path="/" element={<HomePage />} />
                        <Route path="/news" element={<NewsPage />} />

                        {/* Private Route - Profile Page */}
                        <PrivateRoute
                            path="/profile"
                            element={<ProfilePage />}
                            isAuthenticated={isAuthenticated}
                        />

                        {/* Route for Login Form */}
                        <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />

                        {/* 404 Not Found Route */}
                        <Route path="*" element={<div>404 Not Found</div>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
