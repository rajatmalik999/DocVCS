import React from 'react';
import { FaListUl, FaCodeBranch, FaShareAlt, FaTrash, FaKey } from 'react-icons/fa';
import styles from './FileActions.module.css';

const FileActions = ({
  selectedFile,
  userData,
  onVersionHistory,
  onCompareVersions,
  onShare,
  onDeleteFile,
  onTransferOwnership
}) => {
  if (!selectedFile) return null;

  const isOwner = selectedFile.userRole === 'owner';
  const isEditor = selectedFile.userRole === 'editor';

  return (
    <div className={styles.menu}>
      <button className={styles.actionBtn} onClick={onVersionHistory}>
        <FaListUl className={styles.icon} /> Version history
      </button>
      <button className={styles.actionBtn} onClick={onCompareVersions}>
        <FaCodeBranch className={styles.icon} /> Compare versions
      </button>
      <button className={styles.actionBtn} onClick={onShare}>
        <FaShareAlt className={styles.icon} /> Share
      </button>

      {isOwner && (
        <button className={styles.actionBtn} onClick={onTransferOwnership}>
          <FaKey className={styles.icon} /> Transfer Ownership
        </button>
      )}

      {(isOwner || isEditor) && (
        <>
          <div className={styles.divider} />
          <button className={styles.deleteBtn} onClick={onDeleteFile}>
            <FaTrash className={styles.icon} /> Delete File
          </button>
        </>
      )}
    </div>
  );
};

export default FileActions;
