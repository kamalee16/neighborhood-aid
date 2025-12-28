import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">🏠</span>
              <span className="logo-text">Neighbour Aid</span>
            </div>
            <p className="footer-description">
              Building stronger communities through mutual support and neighborly care.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/safety">Safety Guidelines</Link></li>
              <li><Link to="/browse-requests">Browse Requests</Link></li>
              <li><Link to="/browse-offers">Browse Offers</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Get Help</h4>
            <ul className="footer-links">
              <li><Link to="/create-request">Request Help</Link></li>
              <li><Link to="/create-offer">Offer Help</Link></li>
              <li><a href="mailto:support@neighbouraid.com">Contact Support</a></li>
              <li><a href="tel:+1-555-0123">Emergency: (555) 012-3</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Community</h4>
            <ul className="footer-links">
              <li><a href="#" aria-label="Facebook">Facebook</a></li>
              <li><a href="#" aria-label="Twitter">Twitter</a></li>
              <li><a href="#" aria-label="Instagram">Instagram</a></li>
              <li><a href="#" aria-label="LinkedIn">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Neighbour Aid. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;