import React from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown'; // Import the ProfileDropdown
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <h2 className="hostel-name">
        Boys <br />
        <span>Hostel</span>
      </h2>
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
      <Link to="/stories">Success Stories</Link>
      <Link to="/mess">Mess Review</Link>
      <Link to="/ScholarshipPage">Scholarship</Link>
      <ProfileDropdown /> {/* Add Profile Dropdown */}
    </div>
  );
};

export default Navbar;
