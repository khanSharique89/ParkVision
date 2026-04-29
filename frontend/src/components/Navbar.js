import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">ParkVision</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/find-parking">Find Parking</Link></li>
        <li><Link to="/reservations">My Reservations</Link></li>
        <li><Link to="/payment-history">Payment History</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/admin">Admin Panel</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="navbar-actions">
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;