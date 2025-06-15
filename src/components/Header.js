import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from './loginSlice'; // Import the logout action
import WelcomeMessage from './WelcomeMessage';
import './Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };



  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);

  const handleLogout = () => {
    dispatch(logout()); // Clear user state
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="app-header">
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/basket">View Basket</Link>
        {/* Add a link to the Recommendations component */}
        <Link to="/recommendations">AI Recommendations</Link>
        <Link to="/thinking">Gemini 2.5 Thinking</Link>
        <Link to="/agenticai">AIPromptSearch</Link>

      </nav>
      
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button" aria-label="Search">
            <span style={{ fontSize: "30px" }}>🔍</span>
          </button>
        </form>
      
      <div className="auth-buttons">
        <WelcomeMessage />
        {user ? (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        ) : (
      <>
        <Link to="/registration">
          <button className="registration-button">Register</button>
        </Link>
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
      </>
      )}
      </div>
    </header>
  );
};

export default Header;