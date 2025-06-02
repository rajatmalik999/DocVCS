import React from 'react';
import { FaPlus, FaUpload } from 'react-icons/fa';
import styles from './TopBarComponent.module.css';

const TopBarComponent = ({ onCreate, onUpload }) => {
  return (
    <div className={styles.topBar}>
      <button className={styles.createBtn} onClick={onCreate}>
        <FaPlus className={styles.icon} /> Create New File
      </button>
      <button className={styles.uploadBtn} onClick={onUpload}>
        <FaUpload className={styles.icon} /> Upload File
      </button>
    </div>
  );
};

export default TopBarComponent;
