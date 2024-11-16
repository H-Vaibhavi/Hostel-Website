import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProfileDropdown.css'; // Add custom styles for the dropdown
import ProfileIcon from "./assets/images/Profile.png";

const ProfileDropdown = () => {
    const { userEmail, logout } = useAuth(); // Get user email and logout function from context
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout();
      navigate('/login');
    };
  

  return (
    <div className="profile-dropdown">
      <button className="profile-button">
        <img
          src={ProfileIcon} // Replace with user's avatar URL if available
          alt="Profile"
          className="profile-avatar"
        />
      </button>
      <div className="dropdown-menu">
      <p>{userEmail || 'Guest'}</p> 
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
