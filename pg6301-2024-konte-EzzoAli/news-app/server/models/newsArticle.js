// Import dependencies
import mongoose from 'mongoose';

// Define news article schema
const newsArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create news article model
const NewsArticle = mongoose.model('NewsArticle', newsArticleSchema);

export default NewsArticle;
