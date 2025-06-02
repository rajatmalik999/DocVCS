import React, { useState } from 'react';
import { FaKey, FaUserCircle, FaExclamationTriangle } from 'react-icons/fa';
import { createOwnershipTransferRequest } from '../../services/CreateOwnershipTransferRequest';
import styles from './FileOwnerShipTransfer.module.css';
import { useLoader } from '../../../auth/utils';
import { useFileVCS } from '../../context';

const FileOwnerShipTransfer = ({
  selectedFile,
  userData,
  onCancel,
  onConfirm
}) => {
  const [receiverEmail, setReceiverEmail] = useState('');
  const [error, setError] = useState('');
  const { showLoader, hideLoader } = useLoader();
  const { refreshFileList } = useFileVCS();

  const handleTransferRequest = async () => {
    if (!receiverEmail.trim()) {
      setError('Please enter the new owner\'s email');
      return;
    }

    try {
      showLoader('Creating transfer request...');
      setError('');

      const response = await createOwnershipTransferRequest(
        userData.id,
        userData.email,
        selectedFile._id,
        selectedFile.fileGoogleId,
        receiverEmail.trim()
      );

      if (response.success) {
        refreshFileList(); // Trigger refresh
        onConfirm();
      } else {
        setError(response.message || 'Failed to create transfer request');
      }
    } catch (err) {
      setError(err.message || 'Failed to create transfer request');
    } finally {
      hideLoader();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onCancel} aria-label="Close">&times;</button>
        <div className={styles.titleRow}><FaKey className={styles.keyIcon} /> <h2 className={styles.title}>Transfer File Ownership</h2></div>
        <div className={styles.section}>
          <label className={styles.label}>Current Owner</label>
          <div className={styles.ownerBox}>
            {userData.profileImage ? (
              <img src={userData.profileImage} alt={userData.fullName} className={styles.avatar} />
            ) : (
              <FaUserCircle className={styles.avatarIcon} />
            )}
            <div className={styles.ownerInfo}>
              <div className={styles.ownerName}>{userData.fullName}</div>
              <div className={styles.ownerEmail}>{userData.email}</div>
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <label className={styles.label}>New Owner's Email</label>
          <div className={styles.inputBox}>
            <FaUserCircle className={styles.inputIcon} />
            <input
              className={styles.input}
              type="email"
              placeholder="Enter email address"
              value={receiverEmail}
              onChange={(e) => setReceiverEmail(e.target.value)}
            />
          </div>
          {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
        <div className={styles.warningBox}>
          <FaExclamationTriangle className={styles.warningIcon} />
          <div className={styles.warningText}>
            <span className={styles.warningTitle}>Warning:</span> Transferring ownership will grant <b>full control</b> of this file to the selected user.<br />
            <span className={styles.warningHighlight}>You will lose ownership privileges and editing rights</span> unless the new owner grants them back.
          </div>
        </div>
        <div className={styles.actions}>
          <button 
            className={styles.cancelBtn} 
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            className={styles.confirmBtn} 
            onClick={handleTransferRequest}
          >
            Request Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileOwnerShipTransfer;
