import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for Navbar styling

const Navbar = () => {
  return (
    <div className="navbar">
      <h2 className='hostel-name'>Boys <br></br><span>Hostel</span></h2>
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
      <Link to="/stories">Success Stories</Link>
      <Link to="/mess">Mess Review</Link>
      <Link to="/ScholarshipPage">Scholarship</Link>
      
     
    </div>
  );
};

export default Navbar;
