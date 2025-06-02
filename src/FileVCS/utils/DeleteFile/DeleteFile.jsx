import React, { useState } from 'react';
import { FaFileAlt, FaLock, FaSpinner } from 'react-icons/fa';
import styles from './DeleteFile.module.css';
import deleteFile from '../../services/deletFile';
import { useLoader } from '../../../auth/utils';
import { useFileVCS } from '../../context';

const DeleteFile = ({ selectedFile, onCancel, onDelete }) => {
  const [error, setError] = useState(null);
  const { showLoader, hideLoader } = useLoader();
  const { refreshFileList } = useFileVCS();

  const handleDelete = async () => {
    try {
      setError(null);
      showLoader('Deleting file...'); // Show loader with custom message

      // Use fileOwnerId from selectedFile as userId
      const response = await deleteFile(selectedFile.fileOwnerId, selectedFile._id);

      if (response.success) {
        refreshFileList(); // Trigger refresh
        onDelete(); // Close modal and potentially refresh the file list
      } else {
        setError(response.message || 'Failed to delete file');
      }
    } catch (err) {
      setError('An error occurred while deleting the file');
      console.error('Error in handleDelete:', err);
    } finally {
      hideLoader(); // Hide loader when done
    }
  };

  // Check if user has permission to delete (must be owner)
  const canDelete = selectedFile.userRole === 'owner';

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button 
          className={styles.closeBtn} 
          onClick={onCancel} 
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className={styles.title}>Delete File?</h2>
        <p className={styles.desc}>
          Are you sure you want to permanently delete this file and all of its versions? This action cannot be undone.
        </p>
        <div className={styles.infoBox}>
          <div className={styles.infoRow}>
            <FaFileAlt className={styles.icon} /> 
            <span className={styles.label}>File Name:</span> 
            <span className={styles.value}>&quot;{selectedFile.fileName}&quot;</span>
          </div>
          {selectedFile.fileDescription && (
            <div className={styles.infoRow}>
              <span className={styles.label}>Description:</span> 
              <span className={styles.value}>{selectedFile.fileDescription}</span>
            </div>
          )}
          <div className={styles.infoRow}>
            <FaLock className={styles.icon} /> 
            <span className={styles.label}>Role:</span> 
            <span className={styles.value}>{selectedFile.userRole}</span>
          </div>
        </div>
        {!canDelete && (
          <div className={styles.error}>
            You don't have permission to delete this file. Only the owner can delete files.
          </div>
        )}
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}
        <div className={styles.actions}>
          <button 
            className={styles.cancelBtn} 
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            className={styles.deleteBtn} 
            onClick={handleDelete}
            disabled={!canDelete}
          >
            <span className={styles.trashIcon}>🗑️</span>
            Delete File
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFile;
