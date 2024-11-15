import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage';
import AboutUs from './AboutUs';
import SuccessStories from './SuccessStories';
import MessReviewPage from './MessReview';
import RegistrationPage from './RegistrationPage';
import Scholarship from './Scholarship';
import ScholarshipPage from './ScholarshipPage';
import { AuthProvider, useAuth } from './AuthContext';
import AdminLoginPage from './AdminLoginPage';
import AdminPanel from './AdminPanel';  // Ensure this is correctly imported
import AdminDashboard from './AdminDashboard';

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = React.useState(false);

  // Check for admin authentication from localStorage
  React.useEffect(() => {
    const adminData = localStorage.getItem('admin');
    if (adminData) {
      setIsAdminAuthenticated(true);
    }
  }, []);

  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/stories" element={<SuccessStories />} />
            <Route path="/mess" element={<MessReviewPage />} />
            <Route path="/register" element={<RegistrationPage />} />

            {/* Protected Routes */}
            <Route path="/ScholarshipPage"  element={<ScholarshipPage />}/>
            <Route path="/Scholarship"  element={<Scholarship />}/>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLoginPage setIsAdminAuthenticated={setIsAdminAuthenticated} />} />
            <Route
              path="/admin-dashboard"
              element={<AdminDashboard />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
