import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLoginPage.css';
import { useAuth } from './AuthContext';
import adminLogo from './assets/images/Admin.png';

const AdminLoginPage = () => {
    const { login, user } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Hardcoded admin credentials
    const ADMIN_EMAIL = 'admin@example.com';
    const ADMIN_PASSWORD = 'admin123';

    useEffect(() => {
        if (user && user.role === 'admin') {
            // If already logged in as admin, redirect to admin panel
            navigate('/admin-dashboard');
        }
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
    
        // Simulate authentication delay
        setTimeout(() => {
            if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                // Successful login
                login({ email: ADMIN_EMAIL, role: 'admin' }); // Log the user as admin
                setIsLoading(false);
                navigate('/admin-dashboard'); // Redirect to the admin panel
            } else {
                // Failed login
                setErrorMessage('Invalid admin credentials');
                setIsLoading(false);
            }
        }, 1000);
    };
    

    return (
        <div className="admin-login-page">
            {/* Header Section */}
            <div className="header-container">
                <div className="navbar">
                    <img src={adminLogo} alt="Admin" className='logo' />
                    {/* Add other navbar links if needed */}
                </div>
            </div>
            <div className="site-name">
                <h1>Admin Panel - Dr. Babasaheb Ambedkar Backward Class Boys Hostel</h1>
            </div>

            {/* Admin Login Section */}
            <div className="admin-login-section">
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className='text'>Email</label>
                        <input
                            type="email"
                            placeholder='Enter Admin Email'
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
                            placeholder='Enter Password'
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
                <p className="login-redirect">
                    <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Back to Home</a>
                </p>
            </div>

            {/* Footer Section */}
            {/* Optionally add a footer if needed */}
        </div>
    );
};

export default AdminLoginPage;
