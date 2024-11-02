import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for Navbar styling

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
      <Link to="/stories">Success Stories</Link>
      <Link to="/mess">Mess Review</Link>
      <Link to="/scholarship">Scholarship</Link>
      
     
    </div>
  );
};

export default Navbar;
