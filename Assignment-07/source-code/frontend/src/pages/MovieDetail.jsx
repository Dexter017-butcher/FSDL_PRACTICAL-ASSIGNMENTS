import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Simple form state
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/movies/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setMovie(data.movie);
        setReviews(data.reviews);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        navigate('/');
      });
  }, [id, navigate]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return alert('Please write a review');

    try {
      const res = await fetch(`http://localhost:5000/api/movies/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: Number(rating), text: reviewText, reviewerName: 'Anonymous' })
      });
      
      const newReview = await res.json();
      setReviews([newReview, ...reviews]);
      setReviewText('');
      setRating(5);
    } catch (err) {
      console.error(err);
      alert('Failed to submit review');
    }
  };

  if (loading) return <div className="container"><h2>Loading...</h2></div>;
  if (!movie) return null;

  return (
    <div className="container movie-detail-page">
      <div className="detail-container">
        <div className="detail-poster">
          <img src={movie.posterUrl} alt={movie.title} width="250" />
        </div>
        
        <div className="detail-content">
          <h1>{movie.title} ({movie.year})</h1>
          <p><strong>Director:</strong> {movie.director}</p>
          <p>{movie.description}</p>
          
          <hr />

          <div className="reviews-section">
            <h3>Add a Review</h3>
            <form onSubmit={handleSubmitReview} style={{ marginBottom: '2rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label>Rating: </label>
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <textarea
                  rows="3"
                  cols="40"
                  placeholder="Draft your review here..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <button type="submit">Submit Review</button>
            </form>

            <h3>Reviews</h3>
            {reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
               <ul style={{ listStyleType: 'none', padding: 0 }}>
                {reviews.map(review => (
                  <li key={review._id} style={{ borderBottom: '1px solid #ccc', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <strong>{review.reviewerName}</strong> - {review.rating}/5 Stars
                    <p style={{ margin: '0.5rem 0' }}>{review.text}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

