import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import CSS file

const navBar = ({ isAuthenticated }) => {
    return (
        <nav className="navbar"> {/* Add a container for styling */}
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/news">News</Link>
                </li>
                {isAuthenticated && ( /* Only show Profile link if user is authenticated */
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default navBar;
