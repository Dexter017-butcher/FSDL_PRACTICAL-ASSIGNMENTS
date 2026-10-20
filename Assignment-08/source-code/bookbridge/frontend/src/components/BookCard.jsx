import { useNavigate } from 'react-router-dom';

function getConditionBadgeClass(condition) {
  switch (condition) {
    case 'Like new': return 'badge badge-condition-new';
    case 'Good':     return 'badge badge-condition-good';
    case 'Fair':     return 'badge badge-condition-fair';
    default:         return 'badge';
  }
}

// Save to Recently Viewed in localStorage
function saveRecentlyViewed(book) {
  try {
    const stored = JSON.parse(localStorage.getItem('bb_recently_viewed') || '[]');
    const filtered = stored.filter(b => b._id !== book._id);
    const updated = [{ _id: book._id, title: book.title, price: book.price, image: book.image }, ...filtered].slice(0, 4);
    localStorage.setItem('bb_recently_viewed', JSON.stringify(updated));
  } catch (_) {}
}

export default function BookCard({ book }) {
  const navigate = useNavigate();

  const imageUrl = book.image
    ? `http://localhost:5000${book.image}`
    : null;

  // Vary image height based on whether book has an image (masonry effect)
  const imgHeight = imageUrl ? (book._id?.charCodeAt(0) % 2 === 0 ? 220 : 180) : undefined;

  const handleClick = () => {
    saveRecentlyViewed(book);
    navigate(`/books/${book._id}`);
  };

  return (
    <div
      className="book-card"
      id={`book-card-${book._id}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
    >
      {imageUrl ? (
        <div className="book-card-image-wrap">
          <img
            src={imageUrl}
            alt={book.title}
            className="book-card-image"
            style={{ height: imgHeight }}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="book-card-placeholder">📖</div>
      )}

      <div className="book-card-body">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">by {book.author}</p>
        <span className="badge badge-subject">{book.subject}</span>
        <div className="book-card-meta">
          <span className="book-card-price">₹{book.price}</span>
          <span className={getConditionBadgeClass(book.condition)}>
            {book.condition}
          </span>
        </div>
      </div>
    </div>
  );
}
