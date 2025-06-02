import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePopup } from '../../context';
import { useLoader } from '../../utils';
import styles from './PreEmailVerification.module.css';
import logo from '../../assets/logoblack.png';

const PreEmailVerification = () => {
  const navigate = useNavigate();
  const { showPopup } = usePopup();
  const { showLoader, hideLoader } = useLoader();
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const email = localStorage.getItem('pendingVerificationEmail');

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if current input is filled
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      pastedData.split('').forEach((digit, index) => {
        if (index < 6) {
          newOtp[index] = digit;
        }
      });
      setOtp(newOtp);
      inputRefs.current[Math.min(pastedData.length, 5)].focus();
    }
  };

  const handleResend = async () => {
    if (!email) {
      showPopup('Email address not found. Please sign up again.', 'error');
      navigate('../signup');
      return;
    }
    showLoader();
    try {
      setIsResending(true);
      const response = await fetch('http://localhost:3000/api/user/resend-verification-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User not found. Please sign up again.');
        }
        if (response.status === 400) {
          throw new Error('Email already verified. Please log in.');
        }
        throw new Error(data.message || 'Failed to resend verification OTP');
      }
      showPopup('Verification OTP sent successfully! Please check your email.', 'success');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0].focus();
    } catch (error) {
      showPopup(error.message, 'error');
      if (error.message.includes('already verified')) {
        navigate('../login');
      }
    } finally {
      setIsResending(false);
      hideLoader();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      showPopup('Please enter a valid 6-digit OTP', 'error');
      return;
    }
    showLoader();
    try {
      setIsVerifying(true);
      const response = await fetch('http://localhost:3000/api/user/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp: otpString
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }
      showPopup('Email verified successfully! Welcome to Taskly!', 'success');
      localStorage.removeItem('pendingVerificationEmail');
      navigate('/verify-success', { replace: true });
    } catch (error) {
      showPopup(error.message, 'error');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0].focus();
    } finally {
      setIsVerifying(false);
      hideLoader();
    }
  };

  const handleChangeEmail = () => {
    localStorage.removeItem('pendingVerificationEmail');
    navigate('../signup');
  };

  const handleBackToLogin = () => {
    localStorage.removeItem('pendingVerificationEmail');
    navigate('../login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoWrapper}>
          <img className={styles.logo} src={logo} alt="logo" />
        </div>
        <h2 className={styles.title}>Verify Your Email Address</h2>
        <div className={styles.messageContainer}>
          <p className={styles.message}>
            We've sent a 6-digit verification code to <strong>{email}</strong>
          </p>
          <p className={styles.subMessage}>
            Please enter the code below to verify your email address.
            If you don't see the email, please check your spam or junk folder.
          </p>
        </div>

        <form onSubmit={handleVerify} className={styles.otpForm}>
          <div className={styles.otpContainer}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={styles.otpInput}
                autoFocus={index === 0}
                disabled={isVerifying}
              />
            ))}
          </div>

          <button 
            type="submit" 
            className={styles.primaryButton}
            disabled={isVerifying || otp.join('').length !== 6}
          >
            {isVerifying ? (
              <>
                <span className={styles.spinner}></span>
                Verifying...
              </>
            ) : (
              'Verify Email'
            )}
          </button>
        </form>

        <div className={styles.actionContainer}>
          <button 
            className={styles.secondaryButton} 
            type="button" 
            onClick={handleResend}
            disabled={isResending || isVerifying}
          >
            {isResending ? (
              <>
                <span className={styles.spinner}></span>
                Sending...
              </>
            ) : (
              <>
                <span className={styles.buttonIcon}>✉️</span>
                Resend Code
              </>
            )}
          </button>

          <button 
            className={styles.secondaryButton} 
            type="button" 
            onClick={handleChangeEmail}
            disabled={isResending || isVerifying}
          >
            <span className={styles.buttonIcon}>✏️</span>
            Use Different Email
          </button>

          <button 
            className={styles.textButton} 
            type="button" 
            onClick={handleBackToLogin}
            disabled={isResending || isVerifying}
          >
            ← Back to Login
          </button>
        </div>

        <div className={styles.infoContainer}>
          <p className={styles.infoText}>
            <span className={styles.infoIcon}>ℹ️</span>
            Full access will be granted after email verification.
          </p>
          <p className={styles.infoSubText}>
            The verification code will expire in 10 minutes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreEmailVerification;
