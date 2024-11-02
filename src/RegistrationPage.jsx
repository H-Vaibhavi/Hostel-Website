import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegistrationPage.css';
import registrationImage from './assets/images/registrationImage.jpeg';
import axios from 'axios';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setC_password] = useState('');
  const [message, setMessage] = useState(''); // State for success/error messages
  const [messageType, setMessageType] = useState(''); // To determine success or error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== c_password) {
      setMessage('Passwords do not match!');
      setMessageType('error');
      return; // Stop submission
    }

    console.log("Registration data being sent:", { name, email, password, c_password });

    // Make the Axios request
    try {
      const response = await axios.post('http://localhost:3001/register', {
        name,
        email,
        password,
        c_password
      });
      console.log("Registration successful:", response.data);
      
      // Optional: Redirect to a different page on success
      navigate('/login'); // Redirect to login or wherever appropriate
    } catch (error) {
      console.error("Error during registration:", error);
      setMessageType('error');
      if (error.response) {
        setMessage(error.response.data.error || 'An error occurred during registration.');
      } else {
        setMessage('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className="registration-page-container">
      {/* Image container */}
      <div className="image-container animated-slide-left">
        <img src={registrationImage} alt="Hostel Registration" />
      </div>

      {/* Form container */}
      <div className="form-container animated-slide-right">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              className="input-field" 
              name='name' 
              value={name}
              onChange={(e) => setName(e.target.value)} 
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              className="input-field" 
              name='email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="input-field" 
              name='password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              className="input-field" 
              name='c_password' 
              value={c_password}
              onChange={(e) => setC_password(e.target.value)} 
              required
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        {/* Show success or error message */}
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <p className="login-redirect">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
