import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePopup } from '../../context';
import { useLoader } from '../../utils';
import styles from './ForgotPassword.module.css';
import logo from '../../assets/logoblack.png';
import { requestPasswordReset, verifyResetOtp } from '../../services/';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: email, 2: otp
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const { showPopup } = usePopup();
  const { showLoader, hideLoader } = useLoader();

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      showPopup('Please enter your email address', 'error');
      return;
    }
    showLoader();
    setIsLoading(true);
    try {
      const result = await requestPasswordReset(email);
      showPopup(result.message || 'Unknown error', result.success ? 'success' : 'error');
      if (result.success) {
        localStorage.setItem('resetEmail', email);
        setStep(2);
      }
    } finally {
      setIsLoading(false);
      hideLoader();
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      showPopup('Please enter the OTP', 'error');
      return;
    }
    showLoader();
    setIsLoading(true);
    try {
      const result = await verifyResetOtp(email, otp);
      showPopup(result.message || 'Unknown error', result.success ? 'success' : 'error');
      if (result.success) {
        // Redirect to reset-password with token
        navigate(`../reset-password?token=${result.data?.resetToken}`);
      }
    } finally {
      setIsLoading(false);
      hideLoader();
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    showLoader();
    setIsResending(true);
    try {
      const result = await requestPasswordReset(email);
      showPopup(result.message || 'Unknown error', result.success ? 'success' : 'error');
    } finally {
      setIsResending(false);
      hideLoader();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoPlaceholder}>
          <img className={styles.logo} src={logo} alt="logo" />
        </div>
        {step === 1 && (
          <>
            <h1 className={styles.title}>Forgot your password?</h1>
            <p className={styles.subtitle}>Enter your email and we'll send you a reset OTP.</p>
            <form className={styles.form} onSubmit={handleRequestOtp}>
              <label className={styles.label} htmlFor="email">Email Address</label>
              <input
                className={styles.input}
                type="email"
                id="email"
                placeholder="you@email.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className={styles.resetBtn}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          </>
        )}
        {step === 2 && (
          <>
            <h1 className={styles.title}>Enter OTP</h1>
            <p className={styles.subtitle}>Enter the OTP sent to <span className={styles.emailHighlight}>{email}</span></p>
            <form className={styles.form} onSubmit={handleVerifyOtp}>
              <label className={styles.label} htmlFor="otp">OTP</label>
              <input
                className={styles.input}
                type="text"
                id="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
              />
              <button
                className={styles.resetBtn}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
            <button
              className={styles.resetBtn}
              type="button"
              onClick={handleResendOtp}
              disabled={isResending}
              style={{ marginTop: 10 }}
            >
              {isResending ? 'Resending...' : 'Resend OTP'}
            </button>
          </>
        )}
        <div className={styles.footerText}>
          Remembered your password? <a href="../login" className={styles.loginLink}>Log in instead</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
