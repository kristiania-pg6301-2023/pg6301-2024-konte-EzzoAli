import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './newsPage.css'; // Import CSS file

const NewsPage = () => {
    // State to store news articles
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);

    // Function to fetch news articles from the server
    const fetchNews = async () => {
        try {
            const response = await axios.get('/api/news');
            setNews(response.data);
        } catch (error) {
            console.error('Error fetching news articles:', error);
            setError('Failed to fetch news articles. Please try again later.');
        }
    };

    // Fetch news articles on component mount
    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className="news-container"> {/* Add a container for styling */}
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

export default NewsPage;
