import React, { useState } from 'react';
import { FaFileAlt, FaCodeBranch, FaUser } from 'react-icons/fa';
import styles from './DeleteVersion.module.css';
import { useLoader } from '../../../auth/utils';

const DeleteVersion = ({
  selectedVersion,
  onCancel,
  onDelete
}) => {
  const [error, setError] = useState(null);
  const { showLoader, hideLoader } = useLoader();

  const handleDelete = async () => {
    try {
      showLoader('Deleting version...');
      await onDelete(selectedVersion);
      onCancel();
    } catch (err) {
      setError('Failed to delete version');
      console.error('Error deleting version:', err);
    } finally {
      hideLoader();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onCancel} aria-label="Close">&times;</button>
        <h2 className={styles.title}>Delete Version?</h2>
        <p className={styles.desc}>
          Are you sure you want to delete this version? This action cannot be undone. The file and other versions will remain intact.
        </p>
        <div className={styles.infoBox}>
          <div className={styles.infoRow}>
            <FaFileAlt className={styles.icon} /> 
            <span className={styles.label}>File:</span> 
            <span className={styles.value}>{selectedVersion.fileName}</span>
          </div>
          <div className={styles.infoRow}>
            <FaCodeBranch className={styles.icon} /> 
            <span className={styles.label}>Version:</span> 
            <span className={styles.value}>{selectedVersion.version}</span> 
            <span className={styles.date}>| {new Date(selectedVersion.createdAt).toLocaleDateString()}</span>
          </div>
          <div className={styles.infoRow}>
            <FaUser className={styles.icon} /> 
            <span className={styles.label}>Created by:</span> 
            <span className={styles.value}>{selectedVersion.createdBy}</span>
          </div>
        </div>
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
          <button className={styles.deleteBtn} onClick={handleDelete}>
            <span className={styles.trashIcon}>🗑️</span> Delete Version
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteVersion;