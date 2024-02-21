import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsList.css'; // Import CSS file

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('/api/news');
                setNews(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
                setError('Failed to fetch news articles. Please try again later.');
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="news-list-container"> {/* Add a container for styling */}
            <h2>Latest News</h2>
            {error && <p className="error">{error}</p>} {/* Display error message if there is an error */}
            <ul>
                {news.map((article, index) => (
                    <li key={index} className="news-item"> {/* Add a class for individual news items */}
                        <h3>{article.title}</h3>
                        <p>{article.content}</p>
                        <p>Author: {article.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsList;
