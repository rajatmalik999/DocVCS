import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePopup } from '../../context';
import { useLoader } from '../../utils';
import styles from './ResetPassword.module.css';
import { resetPassword } from '../../services/authService';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showPopup } = usePopup();
  const { showLoader, hideLoader } = useLoader();

  // Get token from URL
  const token = searchParams.get('token');

  useEffect(() => {
    // Redirect if no token is present
    if (!token) {
      showPopup('Invalid reset link', 'error');
      navigate('../forgot-password');
    }
  }, [token, navigate, showPopup]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const validatePassword = (password) => {
    // At least 8 characters, 1 symbol or number
    const regex = /^(?=.*[0-9!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate passwords
    if (!validatePassword(formData.password)) {
      showPopup('Password must be at least 8 characters long and contain at least one number or symbol', 'error');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      showPopup('Passwords do not match', 'error');
      return;
    }
    showLoader();
    setIsLoading(true);
    try {
      const result = await resetPassword(token, formData.password);
      showPopup(result.message || 'Unknown error', result.success ? 'success' : 'error');
      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('../login');
        }, 2000);
      }
    } finally {
      setIsLoading(false);
      hideLoader();
    }
  };

  if (isSuccess) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.successIcon}>✓</div>
          <h1 className={styles.title}>Password Changed Successfully!</h1>
          <p className={styles.subtitle}>Your password has been updated. Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Reset Your Password</h1>
        <p className={styles.subtitle}>Enter your new password below to reset your account credentials.</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="password">New Password</label>
          <div className={styles.passwordWrapper}>
            <input
              className={styles.input}
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter new password"
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
          <div className={styles.hintRow}>
            <span className={styles.hintIcon}>✔</span>
            <span className={styles.hintText}>Min. 8 characters, 1 symbol or number</span>
          </div>

          <label className={styles.label} htmlFor="confirmPassword">Confirm New Password</label>
          <div className={styles.passwordWrapper}>
            <input
              className={styles.input}
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Re-enter new password"
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

          <button 
            className={styles.resetBtn} 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? 'Resetting Password...' : 'Set New Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
