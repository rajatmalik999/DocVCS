import React, { useState } from 'react';
import { FaRegSave } from 'react-icons/fa';
import styles from './TakeNewSnapShotComponent.module.css';
import takeSnapshot from '../../services/takeSnapshot';

const TakeNewSnapShotComponent = ({ selectedFile, userData }) => {
  const [commitMessage, setCommitMessage] = useState('');
  const [version, setVersion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCommit = async () => {
    if (!commitMessage || !version) {
      setError('Please provide both a commit message and version number');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await takeSnapshot(
        selectedFile._id,
        userData.id,
        commitMessage,
        version
      );
      
      // Clear form after successful commit
      setCommitMessage('');
      setVersion('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create version snapshot');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <select
            className={styles.versionInput}
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          >
            <option value="">Select Version</option>
            {[...Array(100)].map((_, i) => (
              <option key={i + 1} value={`v${i + 1}`}>
                Version {i + 1}
              </option>
            ))}
          </select>
          <textarea
            className={styles.messageInput}
            rows={3}
            placeholder="Enter commit message..."
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
          />
        </div>
        <button 
          className={styles.commitBtn} 
          onClick={handleCommit}
          disabled={isLoading || !commitMessage || !version}
        >
          <FaRegSave className={styles.icon} />
          {isLoading ? 'Creating...' : 'Create Version Snapshot'}
        </button>
      </div>
    </div>
  );
};

export default TakeNewSnapShotComponent;
