import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import './RegistrationPage.css';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import useAuth

const LoginPage = () => {
    const { login } = useAuth(); // Get login function from context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage("Both fields are required");
            return;
        }

        setIsLoading(true);

        try {
            const result = await axios.post('http://localhost:3001/login', { email, password });
            console.log("Server response:", result);

            // Check the message in the JSON response
            if (result.data.message === "Success") {
                login(); // Set user as authenticated
                navigate('/scholarship');
            } else {
                setErrorMessage("Invalid login credentials");
            }
        } catch (err) {
            console.error("Login error:", err);
            if (err.response && err.response.data && err.response.data.message) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage("An error occurred during login. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            {/* Header Section */}
            <div className="header-container">
                <div className="site-name">
                    <h1>Dr. Babasaheb Ambedkar Backward Class Boys Hostel</h1>
                </div>
                <div className="navbar">
                    <Link to="/about">About Us</Link>
                    <Link to="/stories">Success Stories</Link>
                    <Link to="/mess">Mess Review</Link>
                    <Link to="/scholarship">Apply for Scholarship</Link>
                    <li><Link to="/admin">Admin Panel</Link></li> {/* Link to login page */} 
                    <a href="https://navayan.com/hostel-help.php#Hostel-Documents" target="_blank" rel="noopener noreferrer">Required Documents</a>
                    <Link to="/register" className="register-button">Register</Link>
        
                </div>
            </div>

            <br />

           
            

            {/* Login Section */}
            <div className="login-section">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
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
                        <label>Password</label>
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

            {/* Footer Section */}
            <footer className="footer">
                <p>© 2024 All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default LoginPage;