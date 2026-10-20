import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/movies')
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch movies:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container" style={{ marginTop: '2rem' }}>Loading films...</div>;
  }

  return (
    <div className="container">
      <h1 className="page-title">Popular Films</h1>
      
      <div className="movies-grid">
        {movies.map(movie => (
          <Link to={`/movie/${movie._id}`} key={movie._id} className="movie-card">
            <div className="movie-poster-container">
              <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
            </div>
            <div className="movie-info">
              <div className="movie-title">{movie.title}</div>
              <div className="movie-year">{movie.year}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
