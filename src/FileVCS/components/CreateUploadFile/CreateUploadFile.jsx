import React, { useState } from 'react';
import { FiPlus, FiUpload, FiFileText } from 'react-icons/fi';
import styles from './CreateUploadFile.module.css';
import { CreateNewFile, NewFileUpload } from '../../utils';

const CreateUploadFile = ({ onCreate, onUpload, userData }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const handleCreateClick = () => setShowCreate(true);
  const handleUploadClick = () => setShowUpload(true);
  const handleCloseCreate = () => setShowCreate(false);
  const handleCloseUpload = () => setShowUpload(false);

  return (
    <div className={styles.centered}>
      <div className={styles.box}>
        <FiFileText size={32} color="#64748b" />
        <h2 className={styles.title}>No file opened yet</h2>
        <div className={styles.actions}>
          <button 
            className={styles.createBtn} 
            onClick={handleCreateClick}
            aria-label="Create new file"
          >
            <FiPlus size={18} />
            Create New File
          </button>
          <button 
            className={styles.uploadBtn} 
            onClick={handleUploadClick}
            aria-label="Upload file"
          >
            <FiUpload size={18} />
            Upload File
          </button>
        </div>
        <p className={styles.hint}>Track versions by creating or uploading files</p>
      </div>

      {showCreate && (
        <CreateNewFile 
          onClose={handleCloseCreate} 
          onCreate={onCreate} 
          userData={userData} 
        />
      )}
      
      {showUpload && (
        <NewFileUpload 
          onClose={handleCloseUpload} 
          onUpload={onUpload} 
          userData={userData} 
        />
      )}
    </div>
  );
};

export default CreateUploadFile;
