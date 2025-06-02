import React from 'react';
import styles from './VersionHistoryPage.module.css';
import VersionControlHistory from '../../components/VersionControlHistory/VersionControlHistory';
import PDFViewer from '../../components/PDFViewer/PDFViewer';
import { FileVersionProvider } from '../../context/FileVersionContext';

const VersionHistoryPage = ({ userData, selectedFile }) => {
  return (
    <div className={styles.versionhistorypage}>
      <FileVersionProvider>
        <div className={styles.content}>
          <section className={styles.pdfSection}>
            <PDFViewer />
          </section>
          <section className={styles.historySection}>
            <VersionControlHistory 
              userData={userData}
              selectedFile={selectedFile}
            />
          </section>
        </div>
      </FileVersionProvider>
    </div>
  );
};

export default VersionHistoryPage;
