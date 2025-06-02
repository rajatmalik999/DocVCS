import React, { useState, useEffect, useRef } from 'react';
import { FaGoogle } from 'react-icons/fa';
import styles from './CreateNewFile.module.css';
import getFileTypes from '../../services/getFileTypes';
import getAccessTokenStatus from '../../services/getAccessTokenStatus';
import { handleGoogleOauth } from '../../services/handleGoogleOath';
import createNewFile from '../../services/CreateNewFile';
import { useLoader } from '../../../auth/utils';
import { useFileVCS } from '../../context';

const CreateNewFile = ({ onClose, onCreate, userData }) => {
  const [fileTypes, setFileTypes] = useState([]);
  const [fileType, setFileType] = useState('');
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [tokenCheckError, setTokenCheckError] = useState(null);
  const tagInputRef = useRef(null);
  const { showLoader, hideLoader } = useLoader();
  const { refreshFileList } = useFileVCS();

  // Token check effect
  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        showLoader('Checking Google authorization...');
        if (!userData?.id) {
          setTokenCheckError('User ID not available');
          return;
        }

        const response = await getAccessTokenStatus(userData.id);
        
        if (response.success) {
          setHasAccessToken(!response.data.hasAccessToken || !response.data.isValid);
          if (response.data.hasAccessToken && !response.data.isValid) {
            setTokenCheckError(response.data.reason);
          }
        } else {
          setTokenCheckError(response.data.reason);
        }
      } catch (err) {
        setTokenCheckError('Failed to verify Google authorization');
      } finally {
        hideLoader();
      }
    };

    if (userData?.id) {
      checkAccessToken();
    }
  }, [userData?.id, showLoader, hideLoader]);

  // File types effect
  useEffect(() => {
    const fetchFileTypes = async () => {
      try {
        showLoader('Loading file types...');
        const response = await getFileTypes();
        if (response.success) {
          setFileTypes(response.data);
          if (response.data.length > 0) {
            setFileType(response.data[0]._id);
          }
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Failed to load file types');
      } finally {
        hideLoader();
      }
    };

    fetchFileTypes();
  }, [showLoader, hideLoader]);

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const addTag = () => {
    const newTag = tagInput.trim().toLowerCase();
    if (newTag && !tags.includes(newTag)) {
      if (tags.length < 10) { // Limit to 10 tags
        setTags([...tags, newTag]);
        setTagInput('');
      }
    }
  };

  const handleTagInputBlur = () => {
    if (tagInput.trim()) {
      addTag();
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!fileName.trim() || !fileType || !hasAccessToken) return;

    try {
      showLoader('Creating new file...');
      const response = await createNewFile({
        fileOwnerId: userData.id,
        fileName: fileName.trim(),
        fileDescription: description.trim(),
        fileTags: tags,
        fileTypeId: fileType
      });

      if (response.success) {
        refreshFileList(); // Trigger refresh
        if (onCreate) {
          onCreate(response.data);
        }
        onClose();
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to create file');
    } finally {
      hideLoader();
    }
  };

  const handleGoogleAuth = () => {
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const popup = window.open(
      '',
      'Google Authorization',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (popup) {
      handleGoogleOauth(userData.id, popup);
    } else {
      alert('Please allow popups for this website');
    }
  };

  const renderActionButton = () => {
    if (tokenCheckError) {
      return (
        <button 
          type="button"
          className={styles.googleAuthBtn}
          onClick={handleGoogleAuth}
        >
          <FaGoogle className={styles.googleIcon} />
          {tokenCheckError === 'TOKEN_EXPIRED' ? 'Reauthorize with Google' : 'Authorize with Google'}
        </button>
      );
    }

    return (
      <button 
        type="submit" 
        className={styles.createBtn} 
        disabled={!fileName.trim() || !fileType || !hasAccessToken}
      >
        Create
      </button>
    );
  };

  if (error) {
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.error}>{error}</div>
          <button className={styles.closeBtn} onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">&times;</button>
        <h2 className={styles.title}>Create New File</h2>
        <form className={styles.form} onSubmit={handleCreate}>
          <div className={styles.section}>
            <label className={styles.label}>File Type</label>
            <div className={styles.fileTypeRow}>
              {fileTypes.map(type => (
                <button
                  type="button"
                  key={type._id}
                  className={
                    fileType === type._id
                      ? `${styles.fileTypeBtn} ${styles.selected}`
                      : styles.fileTypeBtn
                  }
                  onClick={() => setFileType(type._id)}
                  aria-label={type.name}
                >
                  <img 
                    src={type.iconUrl} 
                    alt={type.name} 
                    className={styles.fileTypeIcon}
                  />
                  <span>{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <label className={styles.label} htmlFor="fileName">
              File Name <span className={styles.required}>*</span>
            </label>
            <input
              className={styles.input}
              id="fileName"
              type="text"
              placeholder="Enter file name"
              value={fileName}
              onChange={e => setFileName(e.target.value)}
              required
            />
          </div>

          <div className={styles.section}>
            <label className={styles.label} htmlFor="description">
              Description <span className={styles.optional}>(optional)</span>
            </label>
            <textarea
              className={styles.textarea}
              id="description"
              placeholder="Describe the purpose or content of this document..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div className={styles.section}>
            <label className={styles.label} htmlFor="tags">
              Tags <span className={styles.optional}>(optional - max 10)</span>
            </label>
            <div className={styles.tagsContainer}>
              {tags.map((tag, index) => (
                <span key={index} className={styles.tag} title={tag}>
                  {tag}
                  <button
                    type="button"
                    className={styles.tagRemove}
                    onClick={() => removeTag(tag)}
                    aria-label={`Remove tag ${tag}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                ref={tagInputRef}
                type="text"
                className={styles.tagInput}
                value={tagInput}
                onChange={e => setTagInput(e.target.value.replace(/[,\s]+/g, ' '))}
                onKeyDown={handleTagInputKeyDown}
                onBlur={handleTagInputBlur}
                placeholder={tags.length === 0 ? "Add tags..." : ""}
                maxLength={30}
                aria-label="Add tags"
              />
            </div>
            <div className={styles.tagHelp}>
              Press Enter or comma to add a tag. Maximum 10 tags allowed.
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
            {renderActionButton()}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewFile;
