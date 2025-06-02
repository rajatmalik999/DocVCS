import React, { useRef, useState } from 'react';
import { FaCloudUploadAlt, FaLock, FaGlobe } from 'react-icons/fa';
import styles from './NewFileUpload.module.css';

const NewFileUpload = ({ onClose, onUpload }) => {
  const [file, setFile] = useState(null);
  const [docName, setDocName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('private');
  const fileInputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  const handleDragOver = (e) => e.preventDefault();
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleBrowse = () => fileInputRef.current.click();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!docName.trim()) return;
    if (onUpload) {
      onUpload({ file, docName, description, visibility });
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">&times;</button>
        <h2 className={styles.title}>Upload New File</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div
            className={styles.dropZone}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleBrowse}
          >
            <FaCloudUploadAlt className={styles.uploadIcon} />
            <span className={styles.dropText}>
              Drag & drop your file here or click to browse from your computer
            </span>
            <input
              type="file"
              ref={fileInputRef}
              className={styles.fileInput}
              onChange={handleFileChange}
              tabIndex={-1}
              style={{ display: 'none' }}
            />
            {file && <span className={styles.fileName}>{file.name}</span>}
          </div>

          <div className={styles.section}>
            <label className={styles.label} htmlFor="docName">
              Document Name <span className={styles.required}>*</span>
            </label>
            <input
              className={styles.input}
              id="docName"
              type="text"
              placeholder="Enter a meaningful document name"
              value={docName}
              onChange={e => setDocName(e.target.value)}
              required
            />
          </div>

          <div className={styles.section}>
            <label className={styles.label} htmlFor="description">
              Document Description
            </label>
            <input
              className={styles.input}
              id="description"
              type="text"
              placeholder="Add a short description of the file"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className={styles.visibilityRow}>
            <span className={styles.label}>Visibility</span>
            <div className={styles.visibilityBtns}>
              <button
                type="button"
                className={visibility === 'private' ? `${styles.visibilityBtn} ${styles.selected}` : styles.visibilityBtn}
                onClick={() => setVisibility('private')}
                aria-label="Private"
              >
                <FaLock className={styles.visibilityIcon} /> Private <span className={styles.default}>(default)</span>
              </button>
              <button
                type="button"
                className={visibility === 'public' ? `${styles.visibilityBtn} ${styles.selected}` : styles.visibilityBtn}
                onClick={() => setVisibility('public')}
                aria-label="Public"
              >
                <FaGlobe className={styles.visibilityIcon} /> Public <span className={styles.readonly}>(read-only link)</span>
              </button>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.uploadBtn} disabled={!docName.trim()}>
              Upload File
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewFileUpload;
