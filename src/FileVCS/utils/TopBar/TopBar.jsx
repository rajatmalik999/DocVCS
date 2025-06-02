import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaPlus, 
  FaUpload, 
  FaBell as BellIcon, 
  FaCog as SettingsIcon,
  FaFolder 
} from 'react-icons/fa';
import styles from './TopBar.module.css';
import CreateNewFile from '../CreateNewFile/CreateNewFile';

const TopBar = ({ userData }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [showCreateNewFile, setShowCreateNewFile] = useState(false);

  const handleCreateNew = () => {
    setShowCreateNewFile(true);
  };

  const handleCloseCreateNew = () => {
    setShowCreateNewFile(false);
  };

  return (
    <>
      <div className={styles.topBar}>
        <div className={styles.leftSection}>
          <Link to="/" className={styles.brand}>
            <div className={styles.logo}>
              <FaFolder className={styles.logoIcon} />
            </div>
            <span className={styles.brandName}>Document Vault</span>
          </Link>

          <nav className={styles.navigation}>
            <Link 
              to="/" 
              className={`${styles.navLink} ${isHome ? styles.active : ''}`}
            >
              Home
            </Link>
          </nav>
        </div>

        <div className={styles.rightSection}>
          <button className={styles.primaryButton} onClick={handleCreateNew}>
            <FaPlus className={styles.buttonIcon} />
            <span>Create New</span>
          </button>

          <button className={styles.secondaryButton}>
            <FaUpload className={styles.buttonIcon} />
            <span>Upload</span>
          </button>

          <div className={styles.iconButtons}>
            <button className={styles.iconButton}>
              <div className={styles.notificationDot} />
              <BellIcon className={styles.actionIcon} />
            </button>
            <button className={styles.iconButton}>
              <Link to="/user/project/settings">
                <SettingsIcon className={styles.actionIcon} />
              </Link>
            </button>
          </div>

          <div className={styles.userAvatar}>
            <img 
              src={userData?.profilePicture || "https://i.pravatar.cc/100"}
              alt="User avatar"
              className={styles.avatarImage}
            />
          </div>
        </div>
      </div>

      {showCreateNewFile && (
        <CreateNewFile
          onClose={handleCloseCreateNew}
          userData={userData}
        />
      )}
    </>
  );
};

export default TopBar;
