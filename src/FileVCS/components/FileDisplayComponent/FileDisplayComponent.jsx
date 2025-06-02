import React, { useState, useEffect } from 'react';
import { FaDownload, FaExternalLinkAlt, FaEdit, FaTimes, FaExpand, FaCompress } from 'react-icons/fa';
import styles from './FileDisplayComponent.module.css';
import getFileById from '../../services/getFilebyId';
import PDFViewer from '../PDFViewer/PDFViewer';
import { FileDescription } from '../../utils';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getGoogleEditUrl = (fileId, mimeType) => {
  switch (mimeType) {
    case 'application/vnd.google-apps.document':
      return `https://docs.google.com/document/d/${fileId}/edit`;
    case 'application/vnd.google-apps.spreadsheet':
      return `https://docs.google.com/spreadsheets/d/${fileId}/edit`;
    case 'application/vnd.google-apps.presentation':
      return `https://docs.google.com/presentation/d/${fileId}/edit`;
    case 'application/vnd.google-apps.form':
      return `https://docs.google.com/forms/d/${fileId}/edit`;
    default:
      return `https://drive.google.com/file/d/${fileId}/edit`;
  }
};

const FileDisplayComponent = ({ userData, selectedFile }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [showViewer, setShowViewer] = useState(false);
  const [fileMetadata, setFileMetadata] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Add useEffect to close preview when file changes
  useEffect(() => {
    if (showViewer) {
      handleCloseViewer();
    }
  }, [selectedFile?._id]); // Watch for changes in the file ID

  if (!selectedFile) {
    return null;
  }

  const isPDF = () => {
    const fileName = selectedFile.fileName.toLowerCase();
    const mimeType = (selectedFile.fileType?.defaultMimeType || fileMetadata?.contentType || '').toLowerCase();
    return fileName.endsWith('.pdf') || mimeType.includes('application/pdf');
  };

  const handleViewFile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { blob, metadata } = await getFileById(
        selectedFile.fileGoogleId, 
        selectedFile.fileOwnerId
      );
      
      setFileMetadata(metadata);
      const url = URL.createObjectURL(blob);
      setFileUrl(url);
      setShowViewer(true);
      
    } catch (err) {
      setError(err.message || 'Failed to load file. Please try again.');
      console.error('Error viewing file:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { blob, metadata } = await getFileById(
        selectedFile.fileGoogleId, 
        selectedFile.fileOwnerId
      );
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = metadata.fileName || selectedFile.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      
    } catch (err) {
      setError(err.message || 'Failed to download file. Please try again.');
      console.error('Error downloading file:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseViewer = () => {
    setShowViewer(false);
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
      setFileUrl(null);
    }
    setFileMetadata(null);
    setIsFullscreen(false);
  };

  const toggleFullscreen = async () => {
    try {
      const viewerElement = document.querySelector(`.${styles.fileViewer}`);
      if (!document.fullscreenElement) {
        await viewerElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };

  return (
    <div className={styles.panel}>

      <FileDescription selectedFile={selectedFile} userData={userData} />
      {!showViewer ? (
        <div className={styles.previewBox}>
          <img 
            src={selectedFile.iconUrl || selectedFile.fileType?.iconUrl} 
            alt={selectedFile.fileType?.name || 'File icon'} 
            className={styles.previewIcon}
          />
          <div className={styles.previewTitle}>
            {loading ? 'Loading...' : error || 'Preview not available'}
          </div>
          <div className={styles.previewMsg}>
            {!loading && !error && 'Click view button to preview the file.'}
          </div>
          <div className={styles.actionButtons}>
            <button 
              onClick={handleViewFile}
              disabled={loading}
              className={`${styles.actionButton} ${styles.openButton}`}
              title="View"
            >
              <FaExternalLinkAlt />
            </button>
            <button 
              onClick={handleDownload}
              className={`${styles.actionButton} ${styles.downloadButton}`}
              title="Download"
              disabled={loading}
            >
              <FaDownload />
            </button>
            <button 
              onClick={() => window.open(getGoogleEditUrl(selectedFile.fileGoogleId, selectedFile.fileType?.defaultMimeType), '_blank')}
              className={`${styles.actionButton} ${styles.editButton}`}
              title="Edit"
            >
              <FaEdit />
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.fileViewer}>
          <button 
            className={styles.closeButton} 
            onClick={handleCloseViewer}
            title="Close"
          >
            <FaTimes size={24} style={{ display: 'block' }} />
          </button>
          
          {isPDF() ? (
            <PDFViewer
              fileUrl={fileUrl}
              fileName={fileMetadata?.fileName || selectedFile.fileName}
            />
          ) : (
            <iframe
              src={fileUrl}
              className={styles.fileFrame}
              title="File Preview"
            />
          )}
          
          <button 
            className={styles.fullscreenButton}
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? 
              <FaCompress size={24} style={{ display: 'block' }} /> : 
              <FaExpand size={24} style={{ display: 'block' }} />
            }
          </button>
        </div>
      )}
    </div>
  );
};

export default FileDisplayComponent;
