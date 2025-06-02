import React from 'react';
import { FaThumbtack } from 'react-icons/fa';
import styles from './PinnedFiles.module.css';
import { useNavigate } from 'react-router-dom';
import { unpinFile } from '../../services/pinUnpin';
import { useFileVCS } from '../../context/FileVcsContext';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const PinnedFiles = ({ files = [], loading, userId, selectedFileId, onFileSelect }) => {
  const navigate = useNavigate();
  const { refreshFileList } = useFileVCS();
  
  const handleClick = (fileId) => {
    navigate(`/user/project/file/${fileId}`);
  };

  const handleUnpin = async (e, fileId) => {
    e.stopPropagation();
    try {
      const response = await unpinFile({ fileId, userId });
      if (response.file) {
        // Trigger refresh of the files list using FileVCSContext
        refreshFileList();
      }
    } catch (error) {
      console.error('Error unpinning file:', error);
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.title}>
        <FaThumbtack className={styles.pinIcon} /> Pinned
      </div>
      <div className={styles.list}>
        {loading ? (
          <div className={styles.message}>Loading...</div>
        ) : files.length > 0 ? (
          files.map((file) => (
            <div 
              className={`${styles.fileRow} ${file._id === selectedFileId ? styles.selected : ''}`}
              key={file._id} 
              onClick={() => {
                handleClick(file._id);
                onFileSelect(file);
              }}
              title={`Created on ${formatDate(file.createdAt)}`}
            >
              <img 
                src={file.iconUrl} 
                alt="File icon" 
                className={styles.fileIcon}
              />
              <div className={styles.fileInfo}>
                <span className={styles.fileName}>{file.fileName}</span>
              </div>
              <button 
                className={styles.unpinButton}
                onClick={(e) => handleUnpin(e, file._id)}
                title="Unpin file"
              >
                <FaThumbtack className={styles.unpinIcon} />
              </button>
            </div>
          ))
        ) : (
          <div className={styles.message}>No pinned files</div>
        )}
      </div>
    </div>
  );
};

export default PinnedFiles;
