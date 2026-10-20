import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../api';

function getConditionBadgeClass(condition) {
  switch (condition) {
    case 'Like new': return 'badge badge-condition-new';
    case 'Good':     return 'badge badge-condition-good';
    case 'Fair':     return 'badge badge-condition-fair';
    default:         return 'badge';
  }
}

function DetailSkeleton() {
  return (
    <div className="detail-skeleton">
      <div className="skeleton detail-skeleton-img" />
      <div className="detail-skeleton-info">
        <div className="skeleton skeleton-line" style={{ height: 36, width: '80%' }} />
        <div className="skeleton skeleton-line" style={{ width: '45%' }} />
        <div className="skeleton skeleton-line" style={{ height: 40, width: '30%' }} />
        <div style={{ display:'flex', gap: 8 }}>
          <div className="skeleton skeleton-badge" style={{ width: 80 }} />
          <div className="skeleton skeleton-badge" style={{ width: 80 }} />
        </div>
        <div className="skeleton skeleton-line" style={{ height: 80, width: '100%' }} />
        <div className="skeleton skeleton-line" style={{ height: 120, width: '100%' }} />
      </div>
    </div>
  );
}

export default function BookDetail() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [book, setBook]           = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        setBook(res.data);
        // Save to recently viewed
        try {
          const b = res.data;
          const stored = JSON.parse(localStorage.getItem('bb_recently_viewed') || '[]');
          const filtered = stored.filter(x => x._id !== b._id);
          const updated = [{ _id: b._id, title: b.title, price: b.price, image: b.image }, ...filtered].slice(0, 4);
          localStorage.setItem('bb_recently_viewed', JSON.stringify(updated));
        } catch (_) {}
      } catch (err) {
        console.error(err);
        setError('Book not found or server error.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const copyContact = () => {
    if (!book) return;
    const info = book.seller?.email || book.contact || '';
    navigator.clipboard.writeText(info)
      .then(() => addToast('Contact info copied to clipboard!', 'success'))
      .catch(() => addToast('Could not copy — please copy manually.', 'error'));
  };

  const shareLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => addToast('Link copied to clipboard!', 'success'))
      .catch(() => addToast('Could not copy link.', 'error'));
  };

  if (loading) return <DetailSkeleton />;

  if (error || !book) {
    return (
      <div className="empty-state">
        <div style={{ fontSize: '3rem' }}>😕</div>
        <h2 className="empty-state-title">Book Not Found</h2>
        <p className="empty-state-text">{error || 'This book does not exist.'}</p>
        <button className="btn btn-secondary" onClick={() => navigate('/')} style={{ width: 'auto' }}>
          ← Back to Browse
        </button>
      </div>
    );
  }

  const imageUrl = book.image ? `http://localhost:5000${book.image}` : null;

  return (
    <div id="book-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="book-detail">
        {/* LEFT — Image */}
        <div className="book-detail-image-container">
          {imageUrl ? (
            <img src={imageUrl} alt={book.title} className="book-detail-image" />
          ) : (
            <div className="book-detail-placeholder">📖</div>
          )}
        </div>

        {/* RIGHT — Info */}
        <div className="book-detail-info">
          <div>
            <h1 className="book-detail-title">{book.title}</h1>
            <p className="book-detail-author">by {book.author}</p>
          </div>

          <p className="book-detail-price">₹{book.price}</p>

          <div className="book-detail-badges">
            <span className={getConditionBadgeClass(book.condition)}>{book.condition}</span>
            <span className="badge badge-subject">{book.subject}</span>
            {book.status === 'sold' && <span className="badge badge-sold">Sold</span>}
          </div>

          {book.year && (
            <div className="book-detail-section">
              <h3>Edition / Year</h3>
              <p>{book.year}</p>
            </div>
          )}

          {book.description && (
            <div className="book-detail-section">
              <h3>Description</h3>
              <p>{book.description}</p>
            </div>
          )}

          {/* Seller Card */}
          <div className="seller-card">
            <h3>Seller Information</h3>
            {token ? (
              <>
                <p className="seller-name">{book.seller?.name || 'Unknown Seller'}</p>
                <p className="seller-contact">
                  📧 {book.seller?.email || book.contact}
                </p>
                {book.contact && book.contact !== book.seller?.email && (
                  <p className="seller-contact">📱 {book.contact}</p>
                )}
                <div className="seller-actions">
                  <button
                    className="btn btn-outline btn-sm btn-icon"
                    onClick={copyContact}
                    id="copy-contact-btn"
                  >
                    📋 Copy Contact
                  </button>
                  <button
                    className="btn btn-secondary btn-sm btn-icon"
                    onClick={shareLink}
                    id="share-listing-btn"
                  >
                    🔗 Share Listing
                  </button>
                </div>
              </>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => navigate('/login')}
                id="login-to-contact-btn"
                style={{ maxWidth: 280 }}
              >
                Login to see contact info
              </button>
            )}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              className={`wishlist-btn${wishlisted ? ' active' : ''}`}
              onClick={() => {
                setWishlisted(w => !w);
                addToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist ❤️', 'success');
              }}
              id="wishlist-btn"
            >
              {wishlisted ? '❤️ Wishlisted' : '🤍 Add to Wishlist'}
            </button>
            {!token && (
              <button
                className="btn btn-secondary btn-sm btn-icon"
                onClick={shareLink}
                id="share-listing-btn-unauth"
              >
                🔗 Share Listing
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
