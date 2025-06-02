import React from 'react';
import { usePopup } from '../../context';
import styles from './Popup.module.css';

const Popup = () => {
  const { popup } = usePopup();

  if (!popup.show) return null;

  return (
    <div 
      className={`${styles.popup} ${styles[popup.type]} ${popup.show ? styles.show : ''}`}
      role="alert"
    >
      <div className={styles.content}>
        <span className={styles.icon}>
          {popup.type === 'success' ? '✓' : '✕'}
        </span>
        <span className={styles.message}>{popup.message}</span>
      </div>
    </div>
  );
};

export default Popup; 