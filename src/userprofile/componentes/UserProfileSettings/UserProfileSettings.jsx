import React, { useState } from 'react';
import { usePopup } from '../../context/PopupContext';
import styles from './UserProfileSettings.module.css';
import profileImg from '../../assets/logoblack.png';
import { useNavigate } from 'react-router-dom';

const UserProfileSettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [timezone, setTimezone] = useState('GMT');
  const { showPopup } = usePopup();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add your profile update logic here
      showPopup('Profile updated successfully', 'success');
    } catch (error) {
      showPopup(error.message || 'Failed to update profile', 'error');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      // Add your password change logic here
      showPopup('Password changed successfully', 'success');
    } catch (error) {
      showPopup(error.message || 'Failed to change password', 'error');
    }
  };

  const handleNotificationChange = async (type, value) => {
    try {
      // Add your notification settings update logic here
      showPopup(`${type} notifications ${value ? 'enabled' : 'disabled'}`, 'success');
    } catch (error) {
      showPopup(error.message || 'Failed to update notification settings', 'error');
    }
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('../login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Your Profile</h1>
            <p className={styles.subtitle}>Manage your personal information and account security.</p>
          </div>
          <div className={styles.headerActions}>
            <span className={styles.helpIcon} title="Help">&#9432;</span>
            <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
          </div>
        </header>
        <div className={styles.profilePhotoSection}>
          <div className={styles.photoWrapper}>
            <img src={profileImg} alt="Profile" className={styles.profilePhoto} />
            <button className={styles.changePhotoBtn} title="Change Photo">
              <span className={styles.cameraIcon} />
            </button>
          </div>
          <div className={styles.changePhotoText}>Change Photo</div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="fullname">Full Name<span className={styles.required}>*</span></label>
          <input className={styles.input} type="text" id="fullname" placeholder="Enter your full name" required />
          <div className={styles.inputHint}>Required</div>

          <label className={styles.label} htmlFor="email">Email Address</label>
          <input className={styles.input} type="email" id="email" placeholder="user@email.com" autoComplete="email" />

          <label className={styles.label} htmlFor="job">Job Title / Role</label>
          <input className={styles.input} type="text" id="job" placeholder="e.g. Product Manager" />

          <label className={styles.label} htmlFor="contact">Contact Number</label>
          <input className={styles.input} type="tel" id="contact" placeholder="+1 555 234 5678" />

          <div className={styles.sectionDivider} />
          <div className={styles.passwordSectionTitle}><span className={styles.lockIcon} /> Change Password</div>

          <label className={styles.label} htmlFor="currentPassword">Current Password</label>
          <div className={styles.passwordWrapper}>
            <input
              className={styles.input}
              type={showCurrentPassword ? 'text' : 'password'}
              id="currentPassword"
              placeholder="Enter current password"
              autoComplete="current-password"
            />
            <button
              type="button"
              className={styles.showPasswordBtn}
              onClick={() => setShowCurrentPassword((v) => !v)}
              aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
            >
              <span className={styles.eyeIcon} />
            </button>
          </div>

          <label className={styles.label} htmlFor="newPassword">New Password</label>
          <div className={styles.passwordWrapper}>
            <input
              className={styles.input}
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              placeholder="Enter new password"
              minLength={8}
              autoComplete="new-password"
            />
            <button
              type="button"
              className={styles.showPasswordBtn}
              onClick={() => setShowNewPassword((v) => !v)}
              aria-label={showNewPassword ? 'Hide password' : 'Show password'}
            >
              <span className={styles.eyeIcon} />
            </button>
          </div>
          <div className={styles.inputHint}>Minimum 8 characters</div>

          <label className={styles.label} htmlFor="confirmPassword">Confirm New Password</label>
          <div className={styles.passwordWrapper}>
            <input
              className={styles.input}
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Re-enter new password"
              minLength={8}
              autoComplete="new-password"
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
          <div className={styles.inputHint}>Passwords must match.</div>

          <div className={styles.sectionDivider} />
          <div className={styles.preferencesTitle}><span className={styles.helpIcon} /> Preferences</div>

          <div className={styles.preferenceRow}>
            <span>Email Notifications</span>
            <label className={styles.switch}>
              <input 
                type="checkbox" 
                checked={emailNotifications} 
                onChange={(e) => {
                  setEmailNotifications(e.target.checked);
                  handleNotificationChange('Email', e.target.checked);
                }} 
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.preferenceRow}>
            <span>Push Notifications</span>
            <label className={styles.switch}>
              <input 
                type="checkbox" 
                checked={pushNotifications} 
                onChange={(e) => {
                  setPushNotifications(e.target.checked);
                  handleNotificationChange('Push', e.target.checked);
                }} 
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}} className={styles.preferenceRow}>
            <span>Timezone</span>
            <select className={styles.input} value={timezone} onChange={e => setTimezone(e.target.value)}>
              <option value="GMT">GMT</option>
              <option value="UTC">UTC</option>
              <option value="EST">EST</option>
              <option value="PST">PST</option>
            </select>
          </div>

          <button className={styles.saveBtn} type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfileSettings;
