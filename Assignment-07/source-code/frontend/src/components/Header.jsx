import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">CineLog.</Link>
        <nav className="nav-links">
          <Link to="/">Films</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
