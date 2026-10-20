import { CarFront } from 'lucide-react';

export default function Navbar({ currentView, onNavigate }) {
  return (
    <nav className="navbar" style={{ padding: '1rem 0' }}>
      <div className="container flex items-center justify-between">
        <div 
          className="flex items-center gap-2 logo cursor-pointer" 
          onClick={() => onNavigate('cars')}
          style={{ cursor: 'pointer' }}
        >
          <CarFront size={28} className="text-accent" />
          <span>AutoExchange</span>
        </div>
        <div className="flex gap-6 text-sm font-medium">
          <button 
            onClick={() => onNavigate('cars')} 
            className={`transition-colors ${currentView === 'cars' ? 'text-primary font-bold' : 'text-secondary hover:text-primary'} bg-transparent`}
            style={{ fontSize: '0.875rem' }}
          >
            Buy a Car
          </button>
          <button 
            onClick={() => onNavigate('appointments')} 
            className={`transition-colors ${currentView === 'appointments' ? 'text-primary font-bold' : 'text-secondary hover:text-primary'} bg-transparent`}
            style={{ fontSize: '0.875rem' }}
          >
            Appointments
          </button>
          <a href="#" className="text-secondary hover:text-primary transition-colors">About</a>
        </div>
      </div>
    </nav>
  );
}
