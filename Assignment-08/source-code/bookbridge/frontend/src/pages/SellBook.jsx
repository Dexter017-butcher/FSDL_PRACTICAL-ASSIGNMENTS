import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import api from '../api';

const MAX_DESC = 500;

export default function SellBook() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    title: '', author: '', price: '', condition: '',
    subject: '', year: '', contact: '', description: '',
  });
  const [image, setImage]           = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading]       = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'description' && value.length > MAX_DESC) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, author, price, condition, subject, contact } = formData;
    if (!title || !author || !price || !condition || !subject || !contact) {
      addToast('Please fill in all required fields', 'error');
      return;
    }
    if (Number(price) <= 0) {
      addToast('Price must be greater than 0', 'error');
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(k => { if (formData[k]) data.append(k, formData[k]); });
      if (image) data.append('image', image);

      await api.post('/books', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      addToast('Listing posted successfully! 🎉', 'success');
      navigate('/my-listings');
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to create listing. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const descLen = formData.description.length;
  const counterClass = descLen > MAX_DESC - 50 ? (descLen >= MAX_DESC ? 'over' : 'warn') : '';

  return (
    <div className="form-container wide" id="sell-book-page">
      <div className="form-header">
        <h1>📕 Sell a Book</h1>
        <p>List your textbook for other students to find</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* ── Section 1: Book Info ── */}
        <div className="form-section">
          <div className="form-section-title">📖 Book Info</div>

          <div className="form-group">
            <label className="form-label" htmlFor="sell-title">
              Title <span className="required">*</span>
            </label>
            <input
              className="form-input" type="text" id="sell-title" name="title"
              placeholder="e.g. Engineering Mathematics"
              value={formData.title} onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="sell-author">
                Author <span className="required">*</span>
              </label>
              <input
                className="form-input" type="text" id="sell-author" name="author"
                placeholder="e.g. B.S. Grewal"
                value={formData.author} onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="sell-year">Year / Semester</label>
              <input
                className="form-input" type="text" id="sell-year" name="year"
                placeholder="e.g. 2nd Year, Sem 3"
                value={formData.year} onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="sell-description">Description</label>
            <textarea
              className="form-textarea" id="sell-description" name="description"
              placeholder="Describe condition, markings, edition info… (max 500 chars)"
              value={formData.description} onChange={handleChange}
            />
            <span className={`char-counter ${counterClass}`}>
              {descLen} / {MAX_DESC}
            </span>
          </div>
        </div>

        {/* ── Section 2: Pricing & Details ── */}
        <div className="form-section">
          <div className="form-section-title">💰 Pricing &amp; Details</div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="sell-price">
                Price (₹) <span className="required">*</span>
              </label>
              <input
                className="form-input" type="number" id="sell-price" name="price"
                placeholder="e.g. 250" min="1"
                value={formData.price} onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="sell-condition">
                Condition <span className="required">*</span>
              </label>
              <select
                className="form-select" id="sell-condition" name="condition"
                value={formData.condition} onChange={handleChange}
              >
                <option value="">Select condition</option>
                <option value="Like new">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="sell-subject">
              Subject <span className="required">*</span>
            </label>
            <select
              className="form-select" id="sell-subject" name="subject"
              value={formData.subject} onChange={handleChange}
            >
              <option value="">Select subject</option>
              <option value="Engineering">Engineering</option>
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
            </select>
          </div>
        </div>

        {/* ── Section 3: Contact & Cover ── */}
        <div className="form-section">
          <div className="form-section-title">📬 Contact &amp; Cover Photo</div>

          <div className="form-group">
            <label className="form-label" htmlFor="sell-contact">
              Contact (WhatsApp / Email) <span className="required">*</span>
            </label>
            <input
              className="form-input" type="text" id="sell-contact" name="contact"
              placeholder="e.g. 9876543210 or you@email.com"
              value={formData.contact} onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Book Cover Image (JPG/PNG, max 2MB)</label>
            <div className="image-upload-area">
              <input
                type="file" id="sell-image"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleImageChange}
              />
              <div className="image-upload-icon">📷</div>
              <div className="image-upload-text">
                {imagePreview ? 'Replace image' : 'Click or drag to upload'}
              </div>
              <div className="image-upload-hint">JPG / PNG · max 2 MB</div>
            </div>

            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
                <button
                  type="button"
                  className="image-preview-remove"
                  onClick={removeImage}
                  aria-label="Remove image"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          id="sell-submit"
          disabled={loading}
        >
          {loading ? 'Posting…' : '📤 Post Listing'}
        </button>
      </form>
    </div>
  );
}
