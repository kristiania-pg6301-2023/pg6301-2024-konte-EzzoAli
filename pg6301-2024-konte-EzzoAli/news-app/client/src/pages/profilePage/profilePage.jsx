import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profilePage.css'; // Import CSS file

const ProfilePage = () => {
    // State to store user profile data
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    // Function to fetch user profile data from the server
    const fetchProfile = async () => {
        try {
            const response = await axios.get('/api/user/profile');
            setProfile(response.data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setError('Failed to fetch user profile. Please try again later.');
        }
    };

    // Fetch user profile data on component mount
    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className="profile-container"> {/* Add a container for styling */}
            <h2>Profile Page</h2>
            {error && <p className="error">{error}</p>} {/* Display error message if there is an error */}
            {profile ? (
                <div>
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default ProfilePage;
