import React from 'react';
import './SuccessStories.css'; // Optional for custom styling
import Navbar from './Navbar';

// Import student images (replace these with the actual image paths)
import studentImage1 from './assets/images/boy1.jpg';
import studentImage2 from './assets/images/boy2.jpeg';
import studentImage3 from './assets/images/boy3.jpeg';

const SuccessStories = () => {
  return (
    <div className="success-stories-section">
        <Navbar /> {}
      <h2 className="highlight">Inspirational Success Stories</h2>
      <p className="hostel-success">
        Our hostel provides an environment that nurtures talent and ambition. 
        We are proud of our students who excel academically and professionally!
      </p>
      
      <div className="student-boxes">
        <div className="student-box">
          <img src={studentImage1} alt="Student 1" />
          <div className="student-info">
            <h3>Aditya Desai</h3>
            <p>Achievements: Top scorer in engineering entrance exams and scholarship recipient.</p>
          </div>
        </div>
        <div className="student-box">
          <img src={studentImage2} alt="Student 2" />
          <div className="student-info">
            <h3>Om Kamble</h3>
            <p>Achievements: Achieved highest grades in medicine and now studying abroad.</p>
          </div>
        </div>
        <div className="student-box">
          <img src={studentImage3} alt="Student 3" />
          <div className="student-info">
            <h3>Sanjay Chavan</h3>
            <p>Achievements: Secured a place in civil services and inspired many others.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
