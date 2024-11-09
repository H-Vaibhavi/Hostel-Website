// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage';
import AboutUs from './AboutUs';
import SuccessStories from './SuccessStories';
import MessReviewPage from './MessReview';
import RegistrationPage from './RegistrationPage';
import Scholarship from './Scholarship';
import ScholarshipPage from './ScholarshipPage';
import { AuthProvider, useAuth } from './AuthContext'; 
import AdminPanel from './AdminPanel';// Import AuthContext

// PrivateRoute component to protect the Scholarship page
function PrivateRoute({ element }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : (
    <>
      {alert("You need to login first!")}
      <Navigate to="/login" replace /> {/* Redirect to login */}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/stories" element={<SuccessStories />} />
            <Route path="/mess" element={<MessReviewPage />} />
            <Route path="/ScholarshipPage" element={<ScholarshipPage />} /> {/* Protected route */}
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/" element={<ScholarshipPage />} />
            <Route path="/Scholarship" element={<Scholarship />} /> 
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
