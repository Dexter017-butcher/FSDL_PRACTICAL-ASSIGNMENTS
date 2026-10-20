import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Movie from './models/Movie.js';
import Review from './models/Review.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
// Use a local database 'cinelog'
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cinelog')
  .then(() => console.log('Connected to MongoDB (cinelog)'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
// Get all movies
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// Get a single movie and its reviews
app.get('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    
    // Get all reviews for this movie
    const reviews = await Review.find({ movieId: movie._id }).sort({ createdAt: -1 });
    
    res.json({ movie, reviews });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

// Post a review for a movie
app.post('/api/movies/:id/reviews', async (req, res) => {
  try {
    const { movieId, reviewerName, rating, text } = req.body;
    
    const newReview = new Review({
      movieId: req.params.id,
      reviewerName: reviewerName || 'Current User',
      rating,
      text
    });
    
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
