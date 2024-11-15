import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './AboutUs.css';
import hostel1 from './assets/images/hostel1.jpeg';
import hostel2 from './assets/images/hostel2.jpeg';
import hostel3 from './assets/images/hostel3.jpeg';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [animate, setAnimate] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [hostel1, hostel2, hostel3];

  useEffect(() => {
    setAnimate(true);

    // Auto-slide every 3 seconds
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => clearInterval(slideInterval); // Clean up on unmount
  }, [images.length]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
  
    try {
      // Send form data to backend
      const response = await axios.post('http://localhost:3001/contact', formData); // Full URL
      if (response.status === 200) {
        alert('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    }
  };
  


  const [visitorCount, setVisitorCount] = useState(
    parseInt(localStorage.getItem('visitorCount')) || 0
  );

  const [visitorData, setVisitorData] = useState(
    JSON.parse(localStorage.getItem('visitorData')) || []
  );

  const [rating, setRating] = useState(0);
  const [ratings, setRatings] = useState(
    JSON.parse(localStorage.getItem('ratings')) || []
  );

  useEffect(() => {
    // Increment visitor count
    const updatedCount = visitorCount + 1;
    setVisitorCount(updatedCount);
    localStorage.setItem('visitorCount', updatedCount);

    // Update visitor data for graph
    const today = new Date().toLocaleDateString();
    const updatedData = { ...visitorData };
    updatedData[today] = (updatedData[today] || 0) + 1;
    setVisitorData(updatedData);
    localStorage.setItem('visitorData', JSON.stringify(updatedData));
  }, []);

  useEffect(() => {
    localStorage.setItem('ratings', JSON.stringify(ratings));
  }, [ratings]);

  const handleRating = (stars) => {
    // Update the current rating
    setRating(stars);

    // Add the new rating to the ratings array
    const updatedRatings = [...ratings, stars];
    setRatings(updatedRatings);

    // Save updated ratings in localStorage
    localStorage.setItem('ratings', JSON.stringify(updatedRatings));
  };

  const averageRating = (
    ratings.reduce((sum, rating) => sum + rating, 0) / (ratings.length || 1)
  ).toFixed(1);

  const graphData = {
    labels: Object.keys(visitorData),
    datasets: [
      {
        label: 'Visitors',
        data: Object.values(visitorData),
        backgroundColor: '#3498db',
        borderRadius: 5,
      },
    ],
  };

  return (
    <div>
      <div className="about-us-section">
        <Navbar />
        <h2>About Us</h2>

        {/* Image Slider */}
        <div className="slider">
          <div
            className="slides"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {images.map((image, index) => (
              <img src={image} alt={`Hostel Image ${index + 1}`} key={index} />
            ))}
          </div>
        </div>

        {/* Flexbox Container */}
        <div className="flex-container">
          <div className="flex-box">
            <h3>Hostel Information</h3>
            <p>
              Dr. Babasaheb Ambedkar Backward Class Boys Hostel in Vishrambag, Sangli, is a facility aimed at supporting students from
              backward classes by providing quality accommodation. Established with a mission to foster educational and personal development,
              the hostel offers a range of amenities that promote a conducive environment for academic excellence and personal growth.
            </p>
            <p>
              The hostel is equipped with essential facilities like study areas, common recreational spaces, and secure living arrangements,
              ensuring a supportive environment where students can focus on their studies. Additionally, the hostel encourages a sense of
              community among students, creating an inclusive atmosphere that aligns with Dr. Ambedkar's vision of equal opportunities for all.
            </p>
          </div>
          <div className="flex-box">
            <h3>Visitor Information</h3>
            <p>Total Visitors: {visitorCount}</p>
            <div className="graph-container">
              <Bar data={graphData} />
            </div>
            <div className="rating-section">
              <h4>Rate Our Website</h4>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRating(star)}
                    style={{
                      color: star <= rating ? '#f1c40f' : '#ccc',
                      cursor: 'pointer',
                      fontSize: '24px',
                    }}
                    title={`${star} Star${star > 1 ? 's' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p>Your Rating: {rating > 0 ? `${rating} ★` : 'No rating yet'}</p>
              <p>Average Rating: {averageRating} ★</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className={`forms-container ${animate ? 'slide-in' : ''}`}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Contact Us</h3>
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
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
