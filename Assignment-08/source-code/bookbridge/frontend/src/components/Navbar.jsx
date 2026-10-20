import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path ? 'nav-link active' : 'nav-link';

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav className="navbar" id="main-navbar">
        <Link to="/" className="navbar-brand" onClick={closeMobile}>
          <span className="brand-icon">📚</span>
          <span>Book<span className="brand-highlight">Bay</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links">
          <Link to="/" className={isActive('/')}>Browse</Link>

          {user ? (
            <>
              <Link to="/sell" className={isActive('/sell')}>
                <span className="nav-btn nav-btn-primary">+ Sell a Book</span>
              </Link>
              <Link to="/my-listings" className={isActive('/my-listings')}>My Listings</Link>
              <button onClick={logout} className="nav-btn nav-btn-danger" id="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={isActive('/login')}>
                <span className="nav-btn nav-btn-outline">Login</span>
              </Link>
              <Link to="/register" className={isActive('/register')}>
                <span className="nav-btn nav-btn-primary">Register</span>
              </Link>
            </>
          )}
        </div>

        {/* Hamburger toggle */}
        <button
          className={`hamburger${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle navigation"
          id="hamburger-btn"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`} id="mobile-nav">
        <Link to="/" className={isActive('/')} onClick={closeMobile}>Browse</Link>

        {user ? (
          <>
            <Link to="/sell" className={isActive('/sell')} onClick={closeMobile}>
              <span className="nav-btn nav-btn-primary" style={{ display:'block', textAlign:'center' }}>
                + Sell a Book
              </span>
            </Link>
            <Link to="/my-listings" className={isActive('/my-listings')} onClick={closeMobile}>
              My Listings
            </Link>
            <button
              onClick={() => { logout(); closeMobile(); }}
              className="nav-btn nav-btn-danger"
              id="mobile-logout-btn"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={isActive('/login')} onClick={closeMobile}>
              Login
            </Link>
            <Link to="/register" className={isActive('/register')} onClick={closeMobile}>
              <span className="nav-btn nav-btn-primary" style={{ display:'block', textAlign:'center' }}>
                Register
              </span>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
