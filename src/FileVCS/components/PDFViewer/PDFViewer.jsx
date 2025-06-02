import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useFileVersion } from '../../context/FileVersionContext';
import styles from './PDFViewer.module.css';

const PDFViewer = () => {
  const { selectedVersionPdf, isLoading, error } = useFileVersion();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <FaSpinner className={styles.spinner} />
          <span>Loading PDF...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <span>Error loading PDF: {error}</span>
        </div>
      </div>
    );
  }

  if (!selectedVersionPdf) {
    return (
      <div className={styles.container}>
        <div className={styles.placeholder}>
          <span>Select a version to view the PDF</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <iframe
        src={selectedVersionPdf}
        className={styles.pdfFrame}
        title="PDF Viewer"
      />
    </div>
  );
};

export default PDFViewer; 