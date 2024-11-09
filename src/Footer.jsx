import React from 'react';
import './Footer.css';
import facebookLogo from './assets/images/facebook-logo.png';  // replace with actual logo path
import twitterLogo from './assets/images/twitter-logo.png';    // replace with actual logo path
import instagramLogo from './assets/images/instagram-logo.png'; // replace with actual logo path

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Dr. Babasaheb Ambedkar Backward Class Boys Hostel</h3>
          <p>
            The hostel provides accommodation, meals, and other facilities to students of backward classes.
          </p>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p><strong>Email:</strong> hostel@babasaheb.edu</p>
          <p><strong>Phone:</strong> +91 123 456 7890</p>
          <p><strong>Address:</strong> Dr. Babasaheb Ambedkar Backward Class Boys Hostel, XYZ Street, City, Country</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={facebookLogo} alt="Facebook" className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={twitterLogo} alt="Twitter" className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={instagramLogo} alt="Instagram" className="social-icon" />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/scholarship">Scholarship</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Dr. Babasaheb Ambedkar Backward Class Boys Hostel. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
