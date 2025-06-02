import React from 'react';
import { Login } from '../../components';
import styles from './LoginPage.module.css';

const LoginPage = () => (
  <div className={styles.pageBg}>
    <div className={styles.centered}><Login /></div>
  </div>
);

export default LoginPage;
