import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import './RegistrationPage.css';
import Footer from './Footer';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import useAuth
import adminLogo from './assets/images/Admin.png';

const LoginPage = () => {
    const { login } = useAuth(); // Get login function from context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // Add state to track login status
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);  // State for success message visibility
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/login', {
                email,
                password,
            });

            // If login is successful, set login status
            if (response.status === 200 && response.data.message === "Login successful") {
                setErrorMessage("Login successful");
                setIsLoggedIn(true);  // Set to true to hide login form
                setShowSuccessMessage(true); // Show success message
                
                // Hide success message after 3 seconds
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 3000);  // 3000 milliseconds = 3 seconds
            }
        } catch (error) {
            // Display the error message if login fails
            if (error.response && error.response.status === 401) {
                setErrorMessage("Invalid login credentials");
            } else {
                setErrorMessage("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="login-page">
            {/* Header Section */}
            <div className="header-container">
                <div className="navbar">
                    <Link to="/admin"><img src={adminLogo} alt="Admin" className='logo'/></Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/stories">Success Stories</Link>
                    <Link to="/mess">Mess Review</Link>
                    <Link to="/ScholarshipPage">Scholarship</Link>
                    <Link to="/register" className="register-button">Register</Link>
                </div>
            </div>

            <div className="site-name">
                <h1>Dr. Babasaheb Ambedkar Backward Class Boys Hostel</h1>
            </div>

            {/* Login Section */}
            {!isLoggedIn ? (  // Conditionally render login form based on isLoggedIn state
                <div className="login-section">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className='text'>Email</label>
                            <input
                                type="email"
                                placeholder='Enter Email'
                                className="input-field"
                                name='email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className='text'>Password</label>
                            <input
                                type="password"
                                className="input-field"
                                placeholder='Enter password'
                                name='password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button type="submit" className="login-button" disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <p className="register-redirect">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </div>
            ) : (
                // Show success message after login, hide it after 3 seconds
                showSuccessMessage ? (
                    <div className="login-success">
                        <h2>Login Successful!</h2>
                        <p>Welcome to the hostel management system.</p>
                    </div>
                ) : (
                    <div className="block"></div>  // Blank block when success message is hidden
                )
            )}

            {/* Footer Section */}
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default LoginPage;
