import React, { useState, useEffect } from 'react';
import { FaUser, FaClock, FaFile, FaPen, FaTags, FaThumbtack } from 'react-icons/fa';
import styles from './FileDescription.module.css';
import { pinFile, unpinFile } from '../../services/pinUnpin';
import { useFileVCS } from '../../context/FileVcsContext';

const formatDate = (dateString) => {
  if (!dateString) return 'Not available';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const FileDescription = ({ selectedFile, onUpdateFile, userData }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [newFileName, setNewFileName] = useState(selectedFile?.fileName);
  const [newDescription, setNewDescription] = useState(selectedFile?.fileDescription);
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState(selectedFile?.fileTags || []);
  const [isPinning, setIsPinning] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const { refreshFileList } = useFileVCS();

  useEffect(() => {
    if (selectedFile && userData) {
      const pinned = selectedFile.filePinnedBy?.some(
        pin => pin.userId === userData.id
      );
      setIsPinned(pinned);
    }
  }, [selectedFile, userData]);

  if (!selectedFile || !userData) return null;

  const handlePinToggle = async () => {
    if (isPinning) return;

    try {
      setIsPinning(true);
      const response = isPinned 
        ? await unpinFile({ 
            fileId: selectedFile._id, 
            userId: userData.id 
          })
        : await pinFile({ 
            fileId: selectedFile._id, 
            userId: userData.id 
          });

      if (response.file) {
        if (typeof onUpdateFile === 'function') {
          onUpdateFile(response.file);
        }
        setIsPinned(!isPinned);
        refreshFileList();
      }
    } catch (error) {
      console.error('Error toggling pin:', error);
    } finally {
      setIsPinning(false);
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (newFileName.trim() && newFileName !== selectedFile.fileName) {
      onUpdateFile({ ...selectedFile, fileName: newFileName.trim() });
    }
    setIsEditingName(false);
  };

  const handleDescriptionSubmit = (e) => {
    e.preventDefault();
    if (newDescription !== selectedFile.fileDescription) {
      onUpdateFile({ ...selectedFile, fileDescription: newDescription });
    }
    setIsEditingDescription(false);
  };

  const handleTagSubmit = (e) => {
    e.preventDefault();
    if (newTag.trim()) {
      const updatedTags = [...tags, newTag.trim()];
      setTags(updatedTags);
      onUpdateFile({ ...selectedFile, fileTags: updatedTags });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    onUpdateFile({ ...selectedFile, fileTags: updatedTags });
  };

  const canEdit = selectedFile.userRole === 'owner' || selectedFile.userRole === 'editor';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <div className={styles.iconWrapper}>
            <img 
              src={selectedFile.iconUrl} 
              alt={selectedFile.fileType?.name}
              className={styles.fileIcon} 
            />
          </div>
          
          <div className={styles.titleAndPinWrapper}>
            {isEditingName ? (
              <form onSubmit={handleNameSubmit} className={styles.editForm}>
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className={styles.editInput}
                  autoFocus
                  onBlur={handleNameSubmit}
                />
              </form>
            ) : (
              <div className={styles.titleWrapper}>
                <h1 className={styles.title}>{selectedFile.fileName}</h1>
                {canEdit && (
                  <button 
                    className={styles.editButton}
                    onClick={() => {
                      setNewFileName(selectedFile.fileName);
                      setIsEditingName(true);
                    }}
                  >
                    <FaPen size={14} />
                  </button>
                )}
                <button 
                  className={`${styles.pinButton} ${isPinned ? styles.pinned : ''}`}
                  onClick={handlePinToggle}
                  disabled={isPinning}
                >
                  <FaThumbtack size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.metaInfo}>
          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <FaUser className={styles.metaIcon} />
              <div className={styles.metaContent}>
                <span className={styles.metaLabel}>Created by</span>
                <span className={styles.metaValue}>{selectedFile.fileCreatedBy}</span>
              </div>
            </div>

            <div className={styles.metaItem}>
              <FaClock className={styles.metaIcon} />
              <div className={styles.metaContent}>
                <span className={styles.metaLabel}>Last updated</span>
                <span className={styles.metaValue}>{formatDate(selectedFile.updatedAt)}</span>
              </div>
            </div>

            <div className={styles.metaItem}>
              <FaFile className={styles.metaIcon} />
              <div className={styles.metaContent}>
                <span className={styles.metaLabel}>File type</span>
                <span className={styles.metaValue}>{selectedFile.fileType?.name}</span>
              </div>
            </div>

            <div className={styles.metaItem}>
              <svg className={styles.metaIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6H4V8H20V6Z" fill="currentColor"/>
                <path d="M20 10H4V12H20V10Z" fill="currentColor"/>
                <path d="M20 14H4V16H20V14Z" fill="currentColor"/>
              </svg>
              <div className={styles.metaContent}>
                <span className={styles.metaLabel}>Size</span>
                <span className={styles.metaValue}>2.4 MB</span>
              </div>
            </div>

            <div className={styles.metaItem}>
              <svg className={styles.metaIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                <path d="M2 17L12 22L22 17" fill="currentColor"/>
                <path d="M2 12L12 17L22 12" fill="currentColor"/>
              </svg>
              <div className={styles.metaContent}>
                <span className={styles.metaLabel}>Version</span>
                <span className={styles.metaValue}>v2.1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.description}>
        {isEditingDescription ? (
          <form onSubmit={handleDescriptionSubmit} className={styles.editForm}>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className={styles.editTextarea}
              autoFocus
              onBlur={handleDescriptionSubmit}
              placeholder="Add a description..."
            />
          </form>
        ) : (
          <div className={styles.descriptionWrapper}>
            <p>{selectedFile.fileDescription || 'No description available'}</p>
            {canEdit && (
              <button 
                className={styles.editButton}
                onClick={() => {
                  setNewDescription(selectedFile.fileDescription);
                  setIsEditingDescription(true);
                }}
              >
                <FaPen size={14} />
              </button>
            )}
          </div>
        )}
      </div>

      <div className={styles.tagsSection}>
        <div className={styles.tagsHeader}>
          <div className={styles.tagsTitle}>
            <FaTags className={styles.tagsIcon} />
            <span>Tags</span>
          </div>
          {canEdit && (
            <button 
              className={styles.editButton}
              onClick={() => setIsEditingTags(!isEditingTags)}
            >
              <FaPen size={14} />
            </button>
          )}
        </div>
        <div className={styles.tagsContent}>
          {isEditingTags && canEdit && (
            <form onSubmit={handleTagSubmit} className={styles.tagForm}>
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className={styles.tagInput}
                placeholder="Add a tag..."
              />
              <button type="submit" className={styles.addTagButton}>
                Add
              </button>
            </form>
          )}
          <div className={styles.tagsList}>
            {tags.length > 0 ? (
              tags.map((tag, index) => (
                <div key={index} className={styles.tag}>
                  <span>{tag}</span>
                  {canEdit && isEditingTags && (
                    <button
                      className={styles.removeTagButton}
                      onClick={() => removeTag(tag)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className={styles.noTags}>No tags added yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDescription;
