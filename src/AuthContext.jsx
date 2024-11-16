import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null); // State to store user email

  const login = (email) => {
    setIsAuthenticated(true);
    setUserEmail(email); // Set user email
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null); // Clear user email
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
