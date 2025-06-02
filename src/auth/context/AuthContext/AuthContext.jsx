import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePopup } from '../PopupContext';
import {
  login as loginFn,
  signup as signupFn,
  googleLogin as googleLoginFn,
  googleSignup as googleSignupFn,
  logout as logoutFn,
  handleAuthSuccess,
  safeJSONParse
} from './AuthFunctions';

// Create the context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showPopup } = usePopup();

  // Check for existing session on mount
  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');
      if (token && userData) {
        const parsedUser = safeJSONParse(userData);
        if (parsedUser) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
        }
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email, password) =>
    loginFn(email, password, (data) => handleAuthSuccess(data, setUser), showPopup, navigate);

  const signup = (userData) =>
    signupFn(userData, (data) => handleAuthSuccess(data, setUser), showPopup, navigate);

  const googleLogin = (response) =>
    googleLoginFn(response, setUser, showPopup, navigate);

  const googleSignup = (response) =>
    googleSignupFn(response, setUser, showPopup, navigate);

  const logout = () =>
    logoutFn(setUser, navigate, showPopup);

  // Context value with auth methods and state
  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    googleLogin,
    googleSignup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 

