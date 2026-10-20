import mongoose from 'mongoose';
import Movie from './models/Movie.js';
import Review from './models/Review.js';

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/cinelog')
  .then(() => console.log('Connected to MongoDB for Seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

const movies = [
  {
    title: "Dune: Part Two",
    year: 2024,
    director: "Denis Villeneuve",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_Part_Two_poster.jpg",
    description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family."
  },
  {
    title: "Oppenheimer",
    year: 2023,
    director: "Christopher Nolan",
    posterUrl: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb."
  },
  {
    title: "The Grand Budapest Hotel",
    year: 2014,
    director: "Wes Anderson",
    posterUrl: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    description: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge."
  },
  {
    title: "Parasite",
    year: 2019,
    director: "Bong Joon Ho",
    posterUrl: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan."
  },
  {
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    title: "Everything Everywhere All at Once",
    year: 2022,
    director: "Daniel Kwan, Daniel Scheinert",
    posterUrl: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    description: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes."
  }
];

const reviews = [
  { text: "Absolute masterpiece. The cinematography is stunning.", rating: 5, reviewerName: "Cinephile99" },
  { text: "A bit slow in the second act, but the payoff is incredible.", rating: 4, reviewerName: "MovieBuff" },
  { text: "Visually breathtaking. I could watch this every day.", rating: 5, reviewerName: "VisualsLover" }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Movie.deleteMany({});
    await Review.deleteMany({});
    console.log('Cleared existing movies and reviews');

    // Insert new movies
    const createdMovies = await Movie.insertMany(movies);
    console.log(`Inserted ${createdMovies.length} movies`);

    // Add some random reviews to the first few movies
    for (let i = 0; i < 3; i++) {
        const movie = createdMovies[i];
        const newReview = new Review({
            movieId: movie._id,
            reviewerName: reviews[i].reviewerName,
            rating: reviews[i].rating,
            text: reviews[i].text
        });
        await newReview.save();
    }
    console.log('Inserted sample reviews');

    mongoose.disconnect();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
  }
};

seedDatabase();
