// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-section">
        <h4>Quick Links</h4>
        <Link to="/">Home</Link>
        <Link to="/recommendations">AI Recommendations</Link>
        <Link to="/basket">Basket</Link>
        <Link to="/thinking">Gemini 2.5</Link>
      </div>

      <div className="footer-section">
        <h4>Customer Support</h4>
        <p>Email: support@edufiction.com</p>
        <p>Phone: +1 234 567 8901</p>
        <p>Mon-Fri: 9am - 5pm</p>
      </div>

      <div className="footer-section">
        <h4>Follow Us</h4>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">📘</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">🐦</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">📸</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;