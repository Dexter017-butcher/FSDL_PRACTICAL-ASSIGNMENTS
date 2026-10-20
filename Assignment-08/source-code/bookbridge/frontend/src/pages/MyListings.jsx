import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import api from '../api';
import { SkeletonGrid } from '../components/SkeletonCard';

function getConditionBadgeClass(condition) {
  switch (condition) {
    case 'Like new': return 'badge badge-condition-new';
    case 'Good':     return 'badge badge-condition-good';
    case 'Fair':     return 'badge badge-condition-fair';
    default:         return 'badge';
  }
}

/* SVG — No Listings */
function NoListingsSVG() {
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="70" cy="70" r="60" fill="rgba(251,191,36,0.05)" stroke="rgba(251,191,36,0.15)" strokeWidth="1.5"/>
      <rect x="42" y="38" width="56" height="64" rx="6" stroke="rgba(251,191,36,0.4)" strokeWidth="2.5" fill="none"/>
      <line x1="54" y1="58" x2="86" y2="58" stroke="rgba(136,153,184,0.5)" strokeWidth="2" strokeLinecap="round"/>
      <line x1="54" y1="70" x2="86" y2="70" stroke="rgba(136,153,184,0.5)" strokeWidth="2" strokeLinecap="round"/>
      <line x1="54" y1="82" x2="72" y2="82" stroke="rgba(136,153,184,0.5)" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="86" cy="90" r="10" fill="rgba(251,191,36,0.12)" stroke="rgba(251,191,36,0.4)" strokeWidth="2"/>
      <line x1="86" y1="86" x2="86" y2="94" stroke="rgba(251,191,36,0.6)" strokeWidth="2" strokeLinecap="round"/>
      <line x1="82" y1="90" x2="90" y2="90" stroke="rgba(251,191,36,0.6)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

const TABS = ['All', 'Available', 'Sold'];

export default function MyListings() {
  const { addToast } = useToast();
  const [books, setBooks]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData]   = useState({});

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/books/user/mylistings');
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      addToast('Failed to load your listings.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchListings(); }, []);

  const filteredBooks = books.filter(b => {
    if (activeTab === 'Available') return b.status !== 'sold';
    if (activeTab === 'Sold')      return b.status === 'sold';
    return true;
  });

  const handleMarkSold = async (id) => {
    try {
      await api.patch(`/books/${id}/sold`);
      setBooks(books.map(b => b._id === id ? { ...b, status: 'sold' } : b));
      addToast('Marked as sold!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to mark as sold', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      await api.delete(`/books/${id}`);
      setBooks(books.filter(b => b._id !== id));
      addToast('Listing deleted successfully', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to delete listing', 'error');
    }
  };

  const startEditing = (book) => {
    setEditingId(book._id);
    setEditData({
      title: book.title, author: book.author, price: book.price,
      condition: book.condition, subject: book.subject,
      year: book.year || '', contact: book.contact, description: book.description || '',
    });
  };
  const cancelEditing = () => { setEditingId(null); setEditData({}); };
  const handleEditChange = (e) => setEditData({ ...editData, [e.target.name]: e.target.value });

  const saveEdit = async (id) => {
    try {
      const res = await api.put(`/books/${id}`, editData);
      setBooks(books.map(b => b._id === id ? { ...b, ...res.data } : b));
      setEditingId(null);
      addToast('Listing updated!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to update listing', 'error');
    }
  };

  if (loading) {
    return (
      <div id="my-listings-page">
        <div className="page-header">
          <h1 className="page-title">My Listings</h1>
          <p className="page-subtitle">Manage your textbook listings</p>
        </div>
        <SkeletonGrid count={4} />
      </div>
    );
  }

  return (
    <div id="my-listings-page">
      <div className="page-header">
        <h1 className="page-title">My Listings</h1>
        <p className="page-subtitle">Manage your textbook listings</p>
      </div>

      {/* Status Filter Tabs */}
      {books.length > 0 && (
        <div className="status-tabs" id="status-tabs">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`status-tab${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
              id={`tab-${tab.toLowerCase()}`}
            >
              {tab}
              {tab === 'All'       && ` (${books.length})`}
              {tab === 'Available' && ` (${books.filter(b => b.status !== 'sold').length})`}
              {tab === 'Sold'      && ` (${books.filter(b => b.status === 'sold').length})`}
            </button>
          ))}
        </div>
      )}

      {/* Empty state */}
      {books.length === 0 ? (
        <div className="empty-state">
          <NoListingsSVG />
          <h2 className="empty-state-title">No listings yet</h2>
          <p className="empty-state-text">
            You haven't posted any books for sale. Start by listing your first textbook!
          </p>
          <Link to="/sell" className="btn btn-primary" style={{ display:'inline-flex', width:'auto', maxWidth:240 }}>
            + Sell a Book
          </Link>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="empty-state" style={{ padding: '48px 24px' }}>
          <div style={{ fontSize: '2.5rem' }}>📭</div>
          <p className="empty-state-title" style={{ fontSize: '1.2rem' }}>No {activeTab.toLowerCase()} listings</p>
        </div>
      ) : (
        <div className="listings-list">
          {filteredBooks.map(book => (
            <div key={book._id}>
              <div className="listing-item" id={`listing-${book._id}`}>
                {book.image ? (
                  <img
                    src={`http://localhost:5000${book.image}`}
                    alt={book.title}
                    className="listing-item-image"
                  />
                ) : (
                  <div className="listing-item-placeholder">📖</div>
                )}

                <div className="listing-item-info">
                  <h3 className="listing-item-title">{book.title}</h3>
                  <div className="listing-item-meta">
                    <span className="listing-item-price">₹{book.price}</span>
                    <span className={getConditionBadgeClass(book.condition)}>{book.condition}</span>
                    <span className={`badge ${book.status === 'sold' ? 'badge-sold' : 'badge-available'}`}>
                      {book.status === 'sold' ? 'Sold' : 'Available'}
                    </span>
                  </div>
                </div>

                <div className="listing-item-actions">
                  <button className="btn btn-secondary btn-sm" onClick={() => startEditing(book)}>
                    ✏️ Edit
                  </button>
                  {book.status !== 'sold' && (
                    <button className="btn btn-success btn-sm" onClick={() => handleMarkSold(book._id)}>
                      ✅ Sold
                    </button>
                  )}
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(book._id)}>
                    🗑️ Delete
                  </button>
                </div>
              </div>

              {/* Inline Edit Form */}
              {editingId === book._id && (
                <div className="edit-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Title</label>
                      <input className="form-input" name="title" value={editData.title} onChange={handleEditChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Author</label>
                      <input className="form-input" name="author" value={editData.author} onChange={handleEditChange} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Price (₹)</label>
                      <input className="form-input" type="number" name="price" value={editData.price} onChange={handleEditChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Condition</label>
                      <select className="form-select" name="condition" value={editData.condition} onChange={handleEditChange}>
                        <option value="Like new">Like New</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <select className="form-select" name="subject" value={editData.subject} onChange={handleEditChange}>
                        <option value="Engineering">Engineering</option>
                        <option value="Science">Science</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Arts">Arts</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Year / Semester</label>
                      <input className="form-input" name="year" value={editData.year} onChange={handleEditChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact</label>
                    <input className="form-input" name="contact" value={editData.contact} onChange={handleEditChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea className="form-textarea" name="description" value={editData.description} onChange={handleEditChange} />
                  </div>
                  <div className="edit-form-actions">
                    <button className="btn btn-primary btn-sm" style={{ width:'auto' }} onClick={() => saveEdit(book._id)}>
                      💾 Save Changes
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={cancelEditing}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
