// Import the NewsArticle model
import NewsArticle from '../models/NewsArticle';

const newsController = {
    // Create a new news article
    createArticle: async (req, res) => {
        try {
            const { title, content } = req.body;
            const newArticle = new NewsArticle({ title, content });
            await newArticle.save();
            res.status(201).json(newArticle);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Get all news articles
    getAllArticles: async (req, res) => {
        try {
            const articles = await NewsArticle.find();
            res.json(articles);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Update a news article by ID
    updateArticle: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, content } = req.body;
            const updatedArticle = await NewsArticle.findByIdAndUpdate(id, { title, content }, { new: true });
            res.json(updatedArticle);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Delete a news article by ID
    deleteArticle: async (req, res) => {
        try {
            const { id } = req.params;
            await NewsArticle.findByIdAndDelete(id);
            res.json({ message: 'Article deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
};

export default newsController;
