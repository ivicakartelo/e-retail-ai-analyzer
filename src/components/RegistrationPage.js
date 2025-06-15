import React from 'react';
import { Link } from 'react-router-dom';
import './RegistrationPage.css'; // Import the CSS file

const RegistrationPage = () => {
  return (
    <div className="registration-container">
      <Link to="/registration">
        <button className="registration-button">Register</button>
      </Link>
    </div>
  );
};

export default RegistrationPage;