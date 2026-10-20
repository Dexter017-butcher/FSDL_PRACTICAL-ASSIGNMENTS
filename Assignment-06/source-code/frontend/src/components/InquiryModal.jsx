import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

export default function InquiryModal({ car, onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carId: car._id, ...formData })
      });
      if (!response.ok) throw new Error('Failed to submit');
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem',
      backdropFilter: 'blur(4px)'
    }}>
      <div className="animate-fade-in" style={{
        background: 'var(--card-bg)',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '500px',
        position: 'relative',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent' }}
        >
          <X className="text-secondary hover:text-primary" size={24} />
        </button>

        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4 text-center px-8">
            <CheckCircle className="text-success-color" size={48} />
            <h2 className="text-2xl font-bold">Inquiry Sent!</h2>
            <p className="text-secondary text-sm">
              We've received your interest in the {car.year} {car.make} {car.model}. One of our sales representatives will contact you shortly.
            </p>
            <button className="btn btn-outline mt-4" onClick={onClose}>Close</button>
          </div>
        ) : (
          <div style={{ padding: '2rem' }}>
            <h2 className="text-xl font-bold mb-1">Interested in this car?</h2>
            <p className="text-sm text-secondary mb-6">
              {car.year} {car.make} {car.model} • ${car.price.toLocaleString()}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  required 
                  className="form-input" 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  required 
                  className="form-input" 
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea 
                  required 
                  className="form-textarea" 
                  placeholder="I'd like to schedule a test drive..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              
              {status === 'error' && <p style={{ color: 'red', fontSize: '0.875rem', marginBottom: '1rem' }}>Something went wrong. Please try again.</p>}
              
              <button 
                type="submit" 
                className="btn btn-primary btn-block mt-4"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
