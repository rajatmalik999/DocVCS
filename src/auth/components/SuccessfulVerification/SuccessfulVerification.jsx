import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SuccessfulVerification.module.css';

const SuccessfulVerification = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('../login', { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <span className={styles.checkIcon} />
        </div>
        <h1 className={styles.title}>Email Verified Successfully!</h1>
        <p className={styles.text}>
          Your email has been successfully verified. You can now log in to your account and start using the app.
        </p>
        <p className={styles.tip}>
          Welcome aboard! Tip: Explore project templates to kickstart your productivity.
        </p>
        <button 
          className={styles.loginBtn}
          onClick={handleLoginClick}
        >
          Go to Login
        </button>
        <div className={styles.footer}>
          Need help? <span className={styles.supportLink}>Contact Support.</span>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulVerification;
