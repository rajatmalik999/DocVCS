import React from 'react';
import { Signup } from '../../components';
import styles from './SignupPage.module.css';

const SignupPage = () => (
  <div className={styles.pageBg}>
    <div className={styles.centered}><Signup /></div>
  </div>
);

export default SignupPage;
