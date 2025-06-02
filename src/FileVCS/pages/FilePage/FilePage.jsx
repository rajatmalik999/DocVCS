import React from 'react';
import styles from './FilePage.module.css';
import FileDisplayComponent from '../../components/FileDisplayComponent/FileDisplayComponent';
import ChatThread from '../../components/ChatThread/ChatThread';
import DescriptionAndActions from '../../components/DescriptionAndActions/DescriptionAndActions';

const FilePage = ({ userData, selectedFile }) => {
  return (
    <div className={styles.filepage}>
      <div className={styles.mainContent}>
        <div className={styles.fileDisplayWrapper}>
          <FileDisplayComponent userData={userData} selectedFile={selectedFile} />
        </div>
        <div className={styles.chatWrapper}>
          <ChatThread userData={userData} selectedFile={selectedFile} />
        </div>
      </div>
      <div className={styles.sidePanel}>
        <DescriptionAndActions userData={userData} selectedFile={selectedFile} />
      </div>
    </div>
  );
};

export default FilePage;
