export default function CarCard({ car, onInquire }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (miles) => {
    return new Intl.NumberFormat('en-US').format(miles) + ' mi';
  };

  return (
    <div className="card" style={{
      backgroundColor: 'var(--card-bg)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--border-color)',
      transition: 'box-shadow 0.2s, transform 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
    }}>
      <div style={{ position: 'relative', height: '220px' }}>
        <img 
          src={car.imageUrl} 
          alt={`${car.year} ${car.make} ${car.model}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(255,255,255,0.9)',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: '600',
          backdropFilter: 'blur(4px)'
        }}>
          {car.status}
        </div>
      </div>
      
      <div style={{ padding: '1.25rem' }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{car.year} {car.make} {car.model}</h3>
          <span className="text-xl font-bold text-accent">{formatPrice(car.price)}</span>
        </div>
        
        <div className="flex gap-4 text-sm text-secondary mb-6">
          <span>{formatMileage(car.mileage)}</span>
          <span>•</span>
          <span>Automatic</span>
        </div>

        <button 
          className="btn btn-outline btn-block text-sm"
          onClick={(e) => {
            e.stopPropagation();
            onInquire(car);
          }}
        >
          I'm Interested
        </button>
      </div>
    </div>
  );
}
