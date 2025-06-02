import React from 'react';
import { FaPlus, FaUpload, FaUndo, FaStar } from 'react-icons/fa';
import styles from './RightSideInformation.module.css';

const RightSideInformation = () => {
  return (
    <div className={styles.panel}>
      <div className={styles.selectMsg}>
        Select a file from the left to view details here.
      </div>
      <div className={styles.sectionTitle}>QUICK TIPS</div>
      <div className={styles.tipsList}>
        <div className={styles.tip}><FaPlus className={styles.tipIcon} /> Create a file to start versioning.</div>
        <div className={styles.tip}><FaUpload className={styles.tipIcon} /> Upload files from your device.</div>
        <div className={styles.tip}><FaUndo className={styles.tipIcon} /> Restore previous file versions.</div>
        <div className={styles.tip}><FaStar className={styles.tipIcon} /> Pin important files for quick access.</div>
      </div>
      <div className={styles.sectionTitle}>SHORTCUTS</div>
      <div className={styles.shortcutsList}>
        <div className={styles.shortcut}><span className={styles.shortcutKey}>N</span> New file</div>
        <div className={styles.shortcut}><span className={styles.shortcutKey}>U</span> Upload</div>
        <div className={styles.shortcut}><span className={styles.shortcutKey}>/</span> Search</div>
      </div>
    </div>
  );
};

export default RightSideInformation;
