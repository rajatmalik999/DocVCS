import React, { useState, useEffect } from 'react';
import { FaTag, FaUserCircle, FaUndo, FaTimes, FaFilter, FaSort } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './VersionControlHistory.module.css';
import getFileVersions from '../../services/getFileVersions';
import getSelectedVersionDisplayed from '../../services/getSelectedVersionDisplayed';
import { useFileVersion } from '../../context/FileVersionContext';
import { format } from 'date-fns';

const VersionControlHistory = ({ userData, selectedFile }) => {
  const navigate = useNavigate();
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setSelectedVersionPdf, setIsLoading, setError: setPdfError } = useFileVersion();

  useEffect(() => {
    const fetchVersions = async () => {
      if (!selectedFile?._id) return;
      
      try {
        setLoading(true);
        const response = await getFileVersions(selectedFile._id);
        setVersions(response.data.versions);
        setError(null);
      } catch (err) {
        setError('Failed to load version history');
        console.error('Error loading versions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVersions();
  }, [selectedFile]);
  
  const handleClose = () => {
    navigate('/user/project/file');
  };

  const handleViewVersion = async (version) => {
    try {
      setIsLoading(true);
      setPdfError(null);
      const blob = await getSelectedVersionDisplayed(
        version.googleDriveRevisionId,
        userData.id,
        'docx'
      );
      
      const fileUrl = URL.createObjectURL(blob);
      setSelectedVersionPdf(fileUrl);
    } catch (err) {
      console.error('Error viewing version:', err);
      setPdfError('Failed to load version content');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return `Today, ${format(date, 'HH:mm')}`;
    } else if (date.toDateString() === new Date(today.setDate(today.getDate() - 1)).toDateString()) {
      return `Yesterday, ${format(date, 'HH:mm')}`;
    } else {
      return format(date, 'MMM dd, HH:mm');
    }
  };

  if (loading) {
    return (
      <div className={styles.panel}>
        <div className={styles.loading}>Loading version history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.panel}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <button 
        className={styles.closeButton}
        onClick={handleClose}
        aria-label="Close"
      >
        <FaTimes />
      </button>
      
      <div className={styles.headerRow}>
        <span className={styles.title}>VERSION HISTORY</span>
        <div className={styles.headerActions}>
          <button className={styles.headerBtn}>
            <FaFilter /> Filter
          </button>
          <button className={styles.headerBtn}>
            <FaSort /> Sort
          </button>
        </div>
      </div>

      <div className={styles.versionsList}>
        {versions.map((version, index) => (
          <div
            className={`${styles.versionCard} ${index === 0 ? styles.latest : ''}`}
            key={version.id}
          >
            <div className={styles.versionRow}>
              <FaTag className={styles.tagIcon} />
              <span className={styles.version}>Version {version.id}</span>
              <span className={styles.versionDate}>{formatDate(version.timestamp)}</span>
            </div>
            
            <div className={styles.authorRow}>
              <FaUserCircle className={styles.avatarIcon} />
              <span className={styles.author}>{version.creator.email}</span>
            </div>
            
            {version.message && (
              <div className={styles.message}>{version.message}</div>
            )}
            
            <div className={styles.cardActions}>
              <button 
                className={styles.viewBtn}
                onClick={() => handleViewVersion(version)}
              >
                View
              </button>
              <button className={styles.rollbackBtn}>
                <FaUndo /> Rollback
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VersionControlHistory;
