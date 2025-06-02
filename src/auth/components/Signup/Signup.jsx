import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { usePopup } from '../../context';
import { useLoader } from '../../utils';
import { initializeGoogleSignIn } from '../../services';
import styles from './Signup.module.css';
import logo from '../../assets/logoblack.png';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signup, googleSignup } = useAuth();
  const navigate = useNavigate();
  const { showPopup } = usePopup();
  const { showLoader, hideLoader } = useLoader();

  const handleGoogleSignup = async (response) => {
    showLoader();
    try {
      setIsLoading(true);
      await googleSignup(response);
      // Navigation is handled in the context
    } catch (error) {
      console.error('Google signup error:', error);
      // Error is handled in the context
    } finally {
      setIsLoading(false);
      hideLoader();
    }
  };

  useEffect(() => {
    // Load the Google API script
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        initializeGoogleSignIn(handleGoogleSignup, 'signup');
      };
    };

    loadGoogleScript();

    // Cleanup
    return () => {
      const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      showPopup('Please enter your full name', 'error');
      return;
    }
    if (!formData.email.trim()) {
      showPopup('Please enter your email', 'error');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      showPopup('Please enter a valid email address', 'error');
      return;
    }
    setCurrentStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.terms) {
      showPopup('Please accept the Terms of Service and Privacy Policy', 'error');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      showPopup('Passwords do not match', 'error');
      return;
    }
    if (formData.password.length < 8) {
      showPopup('Password must be at least 8 characters long', 'error');
      return;
    }
    showLoader();
    setIsLoading(true);
    try {
      await signup({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName
      });
      localStorage.setItem('pendingVerificationEmail', formData.email);
      navigate('../pre-email-verification');
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
      });
    } catch (error) {
      showPopup(error.message || 'Failed to create account. Please try again.', 'error');
    } finally {
      setIsLoading(false);
      hideLoader();
    }
  };

  const renderStep1 = () => (
    <form className={styles.form} onSubmit={handleContinue}>
          <label className={styles.label} htmlFor="fullName">Full Name</label>
          <input 
            className={styles.input} 
            type="text" 
            id="fullName" 
            placeholder="Your full name" 
            autoComplete="name"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />

          <label className={styles.label} htmlFor="email">Email Address</label>
          <input 
            className={styles.input} 
            type="email" 
            id="email" 
            placeholder="you@email.com" 
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

      <button 
        className={styles.continueBtn} 
        type="submit"
        disabled={isLoading}
      >
        Continue
      </button>
    </form>
  );

  const renderStep2 = () => (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.stepIndicator}>Step 2 of 2</div>

          <label className={styles.label} htmlFor="password">Password</label>
          <div className={styles.passwordWrapper}>
            <input
              className={styles.input}
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="At least 8 characters"
              minLength={8}
              autoComplete="new-password"
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

          <label className={styles.label} htmlFor="confirmPassword">Confirm Password</label>
          <div className={styles.passwordWrapper}>
            <input
              className={styles.input}
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Re-enter password"
              minLength={8}
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              className={styles.showPasswordBtn}
              onClick={() => setShowConfirmPassword((v) => !v)}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              <span className={styles.eyeIcon} />
            </button>
          </div>

          <div className={styles.termsWrapper}>
            <input 
              type="checkbox" 
              id="terms" 
              className={styles.checkbox}
              checked={formData.terms}
              onChange={handleInputChange}
            />
            <label htmlFor="terms" className={styles.termsLabel}>
              I agree to the <a href="#" className={styles.link}>Terms of Service</a> and <a href="#" className={styles.link}>Privacy Policy</a>
            </label>
          </div>

          <button 
            className={styles.signupBtn} 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

      <button 
        type="button" 
        className={styles.backBtn}
        onClick={() => setCurrentStep(1)}
      >
        Back
      </button>
        </form>
  );

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoWrapper}>
          <img className={styles.logo} src={logo} alt="logo" />
        </div>
        <h2 className={styles.title}>Create Your Account</h2>
        <p className={styles.subtitle}>Start managing your startup's work today.</p>
        
        {/* Google Sign-In Button */}
        <div id="googleSignInButton" className={styles.googleBtn} />
        
        <div className={styles.divider}><span />OR<span /></div>
        
        {currentStep === 1 ? renderStep1() : renderStep2()}
        
        <div className={styles.footerText}>
          Already have an account? <a href="../login" className={styles.loginLink}>Log in</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
