import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import './AboutUs.css';
import Footer from './Footer';

const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div>
    <div className="about-us-section">
      <Navbar /> {/* Include the Navbar here */}
      <h2>About Us</h2>
      <p>
        Dr. Babasaheb Ambedkar Backward Class Boys Hostel is committed to
        providing quality accommodation for students from backward classes.
        Established with the goal of creating an inclusive educational
        environment, we aim to foster academic excellence and personal growth.
      </p>

      <h2>Contact Us</h2>
      <form className={`contact-form ${animate ? 'slide-in' : ''}`} onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Send Message
        </button>
      </form>
    </div>
     <Footer />
   </div>
  );
};

export default AboutUs;
