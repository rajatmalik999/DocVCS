import React from 'react';
import UserProfileSettings from '../../components/UserProfileSettings/UserProfileSettings';
import styles from './UserProfileSettingsPage.module.css';

const UserProfileSettingsPage = () => (
  <div className={styles.pageBg}>
    <div className={styles.centered}><UserProfileSettings /></div>
    </div>
  );

export default UserProfileSettingsPage;
