import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CarCard from './components/CarCard';
import InquiryModal from './components/InquiryModal';
import Appointments from './components/Appointments';
import { Search } from 'lucide-react';

function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('cars');

  useEffect(() => {
    fetch('http://localhost:5000/api/cars')
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching cars:", err);
        setLoading(false);
      });
  }, []);

  const filteredCars = cars.filter(car => 
    `${car.make} ${car.model} ${car.year}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      
      {currentView === 'cars' ? (
        <>
          {/* Hero Section */}
          <section className="hero py-20" style={{ backgroundImage: 'linear-gradient(to bottom, #ffffff, #f7f9fa)' }}>
            <div className="container">
              <h1 className="text-4xl md:text-5xl font-aesthetic mb-8 tracking-tight" style={{ color: '#000' }}>
                Find Your Next Car with Confidence
              </h1>
              
              <div className="max-w-xl mx-auto relative">
            <div className="flex items-center" style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '0.5rem', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)' }}>
              <Search className="text-secondary ml-3" size={20} />
              <input 
                type="text" 
                placeholder="Search by make, model, or year..." 
                className="w-full"
                style={{ border: 'none', background: 'transparent', padding: '0.75rem', outline: 'none', fontSize: '1rem' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container py-12 flex-grow" style={{ minHeight: '60vh' }}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Vehicles</h2>
          <span className="text-sm text-secondary font-medium">{filteredCars.length} results</span>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #e5e7eb', borderTopColor: 'var(--primary-color)', animation: 'spin 1s linear infinite' }}></div>
          </div>
        ) : filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map(car => (
              <CarCard 
                key={car._id} 
                car={car} 
                onInquire={setSelectedCar} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-secondary">
            <p>No vehicles found matching your search.</p>
          </div>
        )}
      </main>
      </>
      ) : (
        <Appointments />
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', backgroundColor: '#fff', padding: '2rem 0' }}>
        <div className="container flex justify-between items-center text-sm text-secondary">
          <p>&copy; {new Date().getFullYear()} AutoExchange. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {selectedCar && (
        <InquiryModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .w-full { width: 100%; }
        .min-h-screen { min-height: 100vh; }
        .flex-grow { flex-grow: 1; }
        .max-w-2xl { max-width: 42rem; }
        .max-w-xl { max-width: 36rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .ml-3 { margin-left: 0.75rem; }
        .tracking-tight { letter-spacing: -0.025em; }
        .px-8 { padding-left: 2rem; padding-right: 2rem; }
      `}} />
    </div>
  );
}

export default App;
