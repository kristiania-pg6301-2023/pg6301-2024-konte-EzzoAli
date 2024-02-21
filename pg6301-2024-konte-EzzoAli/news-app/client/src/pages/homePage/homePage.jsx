import React from 'react';
import './homePage.css'; // Import CSS file

const HomePage = () => {
    return (
        <div className="homepage-container"> {/* Add a container for styling */}
            <h2>Welcome to the News App!</h2>
            <p>This is the homepage of our News App.</p>
            <p>Feel free to browse the latest news articles.</p>
        </div>
    );
};

export default HomePage;
