import React, { useState } from 'react';
import { FaSort } from 'react-icons/fa';
import styles from './AllFiles.module.css';
import { useNavigate } from 'react-router-dom';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const AllFiles = ({ files = [], loading, userId, selectedFileId, onFileSelect }) => {
  const navigate = useNavigate();
  const [sortDesc, setSortDesc] = useState(true);
  
  const handleClick = (fileId) => {
    navigate(`/user/project/file/${fileId}`);
  };

  const handleSort = () => {
    setSortDesc(!sortDesc);
  };

  const sortedFiles = [...files].sort((a, b) => {
    if (sortDesc) {
      return b.fileName.localeCompare(a.fileName);
    }
    return a.fileName.localeCompare(b.fileName);
  });

  return (
    <div className={styles.panel}>
      <div className={styles.titleRow}>
        <span className={styles.title}>All Files</span>
        <button 
          className={styles.sortButton} 
          onClick={handleSort}
          title={sortDesc ? "Sort ascending" : "Sort descending"}
        >
          <FaSort className={`${styles.sortIcon} ${sortDesc ? styles.descending : ''}`} />
        </button>
      </div>
      <div className={styles.list}>
        {loading ? (
          <div className={styles.message}>Loading...</div>
        ) : sortedFiles.length > 0 ? (
          sortedFiles.map((file) => (
            <div
              className={`${styles.fileRow} ${file._id === selectedFileId ? styles.selected : ''}`}
              key={file._id}
              onClick={() => onFileSelect(file)}
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
            </div>
          ))
        ) : (
          <div className={styles.message}>No files found</div>
        )}
      </div>
    </div>
  );
};

export default AllFiles;
