import React from 'react';
import { ForgotPassword } from '../../components';
import styles from './ForgotPasswordPage.module.css';

const ForgotPasswordPage = () => (
  <div className={styles.pageBg}>
    <div className={styles.centered}><ForgotPassword /></div>
  </div>
);

export default ForgotPasswordPage;
