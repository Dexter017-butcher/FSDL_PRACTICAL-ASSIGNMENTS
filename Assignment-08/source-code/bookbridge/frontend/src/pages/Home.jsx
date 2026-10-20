import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import BookCard from '../components/BookCard';
import { SkeletonGrid } from '../components/SkeletonCard';

/* Empty State SVG — no search results */
function EmptySearchSVG() {
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="70" cy="70" r="60" fill="rgba(251,191,36,0.05)" stroke="rgba(251,191,36,0.15)" strokeWidth="1.5"/>
      <circle cx="62" cy="60" r="24" stroke="rgba(251,191,36,0.4)" strokeWidth="3" fill="none"/>
      <line x1="80" y1="78" x2="96" y2="94" stroke="rgba(251,191,36,0.4)" strokeWidth="3" strokeLinecap="round"/>
      <line x1="54" y1="60" x2="70" y2="60" stroke="rgba(136,153,184,0.5)" strokeWidth="2" strokeLinecap="round"/>
      <line x1="62" y1="52" x2="62" y2="68" stroke="rgba(136,153,184,0.5)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [books, setBooks]           = useState([]);
  const [total, setTotal]           = useState(0);
  const [pages, setPages]           = useState(1);
  const [page, setPage]             = useState(1);
  const [search, setSearch]         = useState('');
  const [subject, setSubject]       = useState('');
  const [condition, setCondition]   = useState('');
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Load recently viewed from localStorage
  useEffect(() => {
    try {
      const rv = JSON.parse(localStorage.getItem('bb_recently_viewed') || '[]');
      setRecentlyViewed(rv);
    } catch (_) {}
  }, []);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = { page, limit: 12 };
      if (search)    params.search    = search;
      if (subject)   params.subject   = subject;
      if (condition) params.condition = condition;

      const res = await api.get('/books', { params });
      setBooks(res.data.books);
      setTotal(res.data.total);
      setPages(res.data.pages);
    } catch (err) {
      console.error(err);
      setError('Failed to load books. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  }, [page, subject, condition]);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchBooks();
  };

  return (
    <div id="home-page">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-eyebrow">📚 Student Marketplace</div>
        <h1 className="hero-title">
          Find <span className="highlight">Affordable</span> Textbooks
          <br />From Fellow Students
        </h1>
        <p className="hero-subtitle">
          Buy and sell second-hand college textbooks. Save money, reduce waste,
          and help your peers — all in one place.
        </p>

        {/* Floating Search Bar */}
        <form onSubmit={handleSearch} className="search-bar-container" id="search-form">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by title, author or ISBN..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            id="search-input"
          />
          <button type="submit" className="search-btn" id="search-btn">Search</button>
        </form>

        {/* Filters */}
        <div className="filters-row">
          <select
            className="filter-select"
            value={subject}
            onChange={e => { setSubject(e.target.value); setPage(1); }}
            id="filter-subject"
          >
            <option value="">All Subjects</option>
            <option value="Engineering">Engineering</option>
            <option value="Science">Science</option>
            <option value="Commerce">Commerce</option>
            <option value="Arts">Arts</option>
          </select>

          <select
            className="filter-select"
            value={condition}
            onChange={e => { setCondition(e.target.value); setPage(1); }}
            id="filter-condition"
          >
            <option value="">All Conditions</option>
            <option value="Like new">Like New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </select>
        </div>
      </section>

      {/* ── Recently Viewed ── */}
      {recentlyViewed.length > 0 && (
        <section id="recently-viewed-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-title-icon">🕑</span> Recently Viewed
            </h2>
          </div>
          <div className="recently-viewed-grid">
            {recentlyViewed.map(book => (
              <div
                key={book._id}
                className="rv-card"
                onClick={() => navigate(`/books/${book._id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && navigate(`/books/${book._id}`)}
                id={`rv-card-${book._id}`}
              >
                {book.image ? (
                  <img
                    src={`http://localhost:5000${book.image}`}
                    alt={book.title}
                    className="rv-card-image"
                    loading="lazy"
                  />
                ) : (
                  <div className="rv-card-placeholder">📖</div>
                )}
                <div className="rv-card-body">
                  <p className="rv-card-title">{book.title}</p>
                  <p className="rv-card-price">₹{book.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="section-divider" />
        </section>
      )}

      {/* ── Results count ── */}
      {!loading && !error && (
        <p className="results-count">
          <span>{total}</span> book{total !== 1 ? 's' : ''} available
        </p>
      )}

      {/* ── Error ── */}
      {error && <div className="alert alert-error">{error}</div>}

      {/* ── Skeleton ── */}
      {loading && <SkeletonGrid count={8} />}

      {/* ── Books Masonry ── */}
      {!loading && !error && books.length > 0 && (
        <div className="books-masonry" id="books-grid">
          {books.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      {/* ── Empty State ── */}
      {!loading && !error && books.length === 0 && (
        <div className="empty-state">
          <EmptySearchSVG />
          <h2 className="empty-state-title">No books found</h2>
          <p className="empty-state-text">
            Try adjusting your search or filters. Be the first to list a textbook!
          </p>
        </div>
      )}

      {/* ── Pagination ── */}
      {!loading && pages > 1 && (
        <div className="pagination" id="pagination">
          <button
            className="pagination-btn"
            onClick={() => setPage(p => p - 1)}
            disabled={page <= 1}
          >
            ← Previous
          </button>
          <span className="pagination-info">Page {page} of {pages}</span>
          <button
            className="pagination-btn"
            onClick={() => setPage(p => p + 1)}
            disabled={page >= pages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
