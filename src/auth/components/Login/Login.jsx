import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth , usePopup } from '../../context';
import { useLoader } from '../../utils';
import { initializeGoogleSignIn } from '../../services';
import styles from './Login.module.css';
import logo from '../../assets/logoblack.png';

const Login = () => {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  // State to manage form input values
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  // State to indicate loading status during authentication
  // (isLoading is now only for button state, loader is global)
  const [isLoading, setIsLoading] = useState(false);
  // Get authentication and popup context functions
  const { login, googleLogin } = useAuth();
  const { showPopup } = usePopup();
  const { showLoader, hideLoader } = useLoader();
  // React Router navigation hook
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamically load the Google Sign-In script and initialize the button
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        initializeGoogleSignIn(onGoogleResponse, 'signin');
      };
    };

    loadGoogleScript();

    // Cleanup: Remove the Google script when the component unmounts
    return () => {
      const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  // Handles the response from Google Sign-In
  const onGoogleResponse = async (response) => {
    showLoader();
    setIsLoading(true);
    try {
      await googleLogin(response);
      // Success: Popup and navigation are handled in AuthContext
    } catch (error) {
      showPopup(error.message, 'error');
    } finally {
      setIsLoading(false);
      hideLoader();
    }
  };

  // Updates form state when user types in email or password
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handles form submission for email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoader();
    setIsLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      // If email verification is required, redirect and show popup
      if (result && result.requiresVerification) {
        localStorage.setItem('pendingVerificationEmail', formData.email);
        showPopup('Please verify your email to continue', 'error');
        navigate('../pre-email-verification');
        return;
      }
      // Reset form fields after successful login
      setFormData({
        email: '',
        password: ''
      });
    } catch (error) {
      showPopup(error.message || 'Something went wrong. Please try again.', 'error');
    } finally {
      setIsLoading(false);
      hideLoader();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoWrapper}>
          <img className={styles.logo} src={logo} alt="logo" />
        </div>
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Sign in to your workspace</p>
        
        {/* Google Sign-In Button is rendered here by Google API */}
        <div id="googleSignInButton" className={styles.googleBtn} />
        
        <div className={styles.divider}><span />or sign in with email<span /></div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input 
            className={styles.input} 
            type="email" 
            id="email" 
            placeholder="you@email.com" 
            autoComplete="username"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <span className={styles.inputHint}>Enter your email address</span>
          
          <label className={styles.label} htmlFor="password">Password</label>
          <div className={styles.passwordWrapper}>
            <input
              className={styles.input}
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Your password"
              minLength={8}
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              className={styles.showPasswordBtn}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <span className={styles.eyeIcon} />
            </button>
          </div>
          <span className={styles.inputHint}>Must be at least 8 characters</span>
          
          <div className={styles.forgotWrapper}>
            <Link to="../forgot-password" className={styles.forgotLink}>Forgot Password?</Link>
          </div>
          
          <button 
            className={styles.loginBtn} 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <div className={styles.footerText}>
          Don't have an account? <Link to="../signup" className={styles.createLink}>Create one</Link>
        </div>
        <div className={styles.copyright}>
          © 2025 ProjectPilot. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
