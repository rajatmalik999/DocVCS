import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaCog, FaUserMinus, FaTimes } from 'react-icons/fa';
import styles from './SharedWith.module.css';
import UserVCSSettings from '../../components/UserVCSSettings/UserVCSSettings';
import { getFilePermissions } from '../../services/getFilePermissions';

const SharedWith = ({ selectedFile, userData }) => {
  const [showModal, setShowModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [filePermissions, setFilePermissions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPermissions = async () => {
      if (!selectedFile?._id) return;
      
      try {
        setLoading(true);
        const permissions = await getFilePermissions(selectedFile._id);
        setFilePermissions(permissions);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching file permissions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [selectedFile?._id]);

  const handleSettingsClick = (userInfo) => {
    setSelectedUserData(userInfo);
    setShowSettingsModal(true);
  };

  const AvatarGrid = () => {
    if (!filePermissions?.users) return null;
    
    return (
      <div className={styles.avatarGrid}>
        {filePermissions.users.slice(0, 4).map(userInfo => (
          <div 
            key={userInfo.user._id} 
            className={styles.avatarWrapper}
            title={`${userInfo.email}\n${userInfo.role}`}
          >
            <img 
              src={userInfo.user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.email)}&background=random`}
              alt={userInfo.email} 
              className={styles.gridAvatar}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.email)}&background=random`;
              }}
            />
          </div>
        ))}
        {filePermissions.users.length > 4 && (
          <div className={styles.avatarWrapper} title="More users">
            <div className={styles.moreCount}>+{filePermissions.users.length - 4}</div>
          </div>
        )}
      </div>
    );
  };

  const Modal = () => (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Shared Users Management</h2>
          <button 
            className={styles.closeButton}
            onClick={() => setShowModal(false)}
          >
            <FaTimes />
          </button>
        </div>
        <div className={styles.modalContent}>
          {filePermissions?.users.map(userInfo => (
            <div key={userInfo.user._id} className={styles.userListItem}>
              <div className={styles.userInfo}>
                <img 
                  src={userInfo.user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.email)}&background=random`}
                  alt={userInfo.email} 
                  className={styles.avatar}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.email)}&background=random`;
                  }}
                />
                <div className={styles.userDetails}>
                  <span className={styles.userName}>{userInfo.email}</span>
                  <span className={styles.userEmail}>{userInfo.email}</span>
                </div>
              </div>
              <div className={styles.userActions}>
                <button 
                  className={styles.settingsButton} 
                  onClick={() => handleSettingsClick(userInfo)}
                >
                  <FaCog />
                </button>
                <button className={styles.removeButton}>
                  <FaUserMinus />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <div className={styles.loading}>Loading shared users...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!filePermissions) {
    return null;
  }

  const canShareFile = userData?._id === filePermissions.createdBy._id;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>SHARED WITH</h2>
        {canShareFile && (
          <button className={styles.addButton}>
            <FaUserPlus /> Add User
          </button>
        )}
      </div>

      <div className={styles.collapsedView}>
        <AvatarGrid />
        <button 
          className={styles.manageAccessButton}
          onClick={() => setShowModal(true)}
        >
          Manage Access
        </button>
      </div>

      {showModal && <Modal />}
      
      {showSettingsModal && selectedUserData && (
        <div className={styles.settingsModalOverlay}>
          <div className={styles.settingsModal}>
            <div className={styles.settingsModalHeader}>
              <button 
                className={styles.closeButton}
                onClick={() => {
                  setShowSettingsModal(false);
                  setSelectedUserData(null);
                }}
              >
                <FaTimes />
              </button>
            </div>
            <UserVCSSettings 
              userData={selectedUserData}
              onClose={() => {
                setShowSettingsModal(false);
                setSelectedUserData(null);
              }}
              isModal={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedWith;
