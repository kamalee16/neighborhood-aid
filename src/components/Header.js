import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <span className="logo-icon">🏠</span>
            <span className="logo-text">Neighbour Aid</span>
          </Link>

          <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/browse-requests" className="nav-link" onClick={closeMobileMenu}>
              Browse Requests
            </Link>
            <Link to="/browse-offers" className="nav-link" onClick={closeMobileMenu}>
              Browse Offers
            </Link>
            <Link to="/about" className="nav-link" onClick={closeMobileMenu}>
              About
            </Link>
            <Link to="/safety" className="nav-link" onClick={closeMobileMenu}>
              Safety
            </Link>
            
            {user ? (
              <div className="user-menu">
                <Link to="/messages" className="nav-link" onClick={closeMobileMenu}>
                  Messages
                </Link>
                <Link to="/profile" className="nav-link" onClick={closeMobileMenu}>
                  Profile
                </Link>
                <button onClick={handleLogout} className="btn btn-outline">
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-outline" onClick={closeMobileMenu}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary" onClick={closeMobileMenu}>
                  Register
                </Link>
              </div>
            )}
          </nav>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;