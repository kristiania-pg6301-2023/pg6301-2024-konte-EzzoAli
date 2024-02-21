// Import dependencies
import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import NewsArticle from "../models/NewsArticle";

// Create router
const router = express.Router();

// Route: GET /api/news
// Description: Get all news articles
router.get('/', async (req, res) => {
    try {
        // Fetch all news articles
        const articles = await NewsArticle.find();

        // Send articles in response
        res.json(articles);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route: POST /api/news
// Description: Create a new news article
router.post('/', authMiddleware, async (req, res) => {
    try {
        // Extract article data from request body
        const { title, content } = req.body;

        // Check if title and content are provided
        if (!title || !content) {
            return res.status(400).json({ error: 'Please provide title and content' });
        }

        // Create new news article
        const newArticle = new NewsArticle({
            title,
            content,
            author: req.user._id // Assign the current user as the author
        });

        // Save the article to the database
        await newArticle.save();

        // Send success message
        res.json({ message: 'Article created successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
});



export default router;
