import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaLink, FaCopy, FaTrash, FaCrown, FaPlus } from 'react-icons/fa';
import { getFileAccessDetails } from '../../services/getFileAccessDetails';
import { giveFileAccess } from '../../services/giveFileAccess';
import styles from './ShareFile.module.css';

const roleMapping = {
  'owner': 'Owner',
  'editor': 'Can Edit',
  'commenter': 'Can Comment',
  'viewer': 'Can View'
};

const reverseRoleMapping = {
  'Can Edit': 'editor',
  'Can Comment': 'commenter',
  'Can View': 'viewer'
};

const ShareFile = ({ onClose, selectedFile }) => {
  const [emails, setEmails] = useState(['']);
  const [permissions, setPermissions] = useState(['Can View']);
  const [publicSharing, setPublicSharing] = useState(false);
  const [shared, setShared] = useState([]);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchAccessDetails = async () => {
      try {
        setLoading(true);
        const response = await getFileAccessDetails(selectedFile._id);
        if (response.success) {
          const ownerData = response.data.permissions.find(user => user.role === 'owner');
          const otherUsers = response.data.permissions
            .filter(user => user.role !== 'owner')
            .map(user => ({
              email: user.email,
              name: user.fullName,
              avatar: user.profileImage,
              permission: roleMapping[user.role] || 'Can View'
            }));

          setOwner(ownerData ? {
            email: ownerData.email,
            name: ownerData.fullName,
            avatar: ownerData.profileImage
          } : null);
          setShared(otherUsers);
          setPublicSharing(response.data.visibilityStatus === 'public');
        }
      } catch (err) {
        setError('Failed to load file access details');
        console.error('Error fetching file access details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedFile?._id) {
      fetchAccessDetails();
    }
  }, [selectedFile]);

  const handleAddEmail = () => {
    setEmails([...emails, '']);
    setPermissions([...permissions, 'Can View']);
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handlePermissionChange = (index, value) => {
    const newPermissions = [...permissions];
    newPermissions[index] = value;
    setPermissions(newPermissions);
  };

  const handleRemoveEmail = (index) => {
    const newEmails = emails.filter((_, i) => i !== index);
    const newPermissions = permissions.filter((_, i) => i !== index);
    setEmails(newEmails);
    setPermissions(newPermissions);
  };

  const handleSendInvite = async () => {
    try {
      setIsSaving(true);
      const validEmails = emails.filter(email => email.trim());
      if (validEmails.length === 0) return;

      const newPermissions = validEmails.map((email, index) => ({
        email: email.trim(),
        role: reverseRoleMapping[permissions[index]]
      }));

      await giveFileAccess(
        selectedFile._id,
        newPermissions,
        publicSharing ? 'public' : 'private',
        selectedFile.fileGoogleId,
        selectedFile.fileOwnerId
      );

      // Refresh the list
      const response = await getFileAccessDetails(selectedFile._id);
      if (response.success) {
        const otherUsers = response.data.permissions
          .filter(user => user.role !== 'owner')
          .map(user => ({
            email: user.email,
            name: user.fullName,
            avatar: user.profileImage,
            permission: roleMapping[user.role] || 'Can View'
          }));
        setShared(otherUsers);
      }

      // Clear the form
      setEmails(['']);
      setPermissions(['Can View']);
    } catch (err) {
      setError('Failed to update permissions');
      console.error('Error updating permissions:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePermission = async (email, newPermission) => {
    try {
      setIsSaving(true);
      const updatedPermissions = shared.map(user => ({
        email: user.email,
        role: user.email === email ? reverseRoleMapping[newPermission] : reverseRoleMapping[user.permission]
      }));

      await giveFileAccess(
        selectedFile._id,
        updatedPermissions,
        publicSharing ? 'public' : 'private',
        selectedFile.fileGoogleId,
        selectedFile.fileOwnerId
      );

      setShared(shared.map(user => 
        user.email === email ? { ...user, permission: newPermission } : user
      ));
    } catch (err) {
      setError('Failed to update permission');
      console.error('Error updating permission:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (userEmail) => {
    try {
      setIsSaving(true);
      const updatedPermissions = shared
        .filter(user => user.email !== userEmail)
        .map(user => ({
          email: user.email,
          role: reverseRoleMapping[user.permission]
        }));

      await giveFileAccess(
        selectedFile._id,
        updatedPermissions,
        publicSharing ? 'public' : 'private',
        selectedFile.fileGoogleId,
        selectedFile.fileOwnerId
      );

      setShared(shared.filter(u => u.email !== userEmail));
    } catch (err) {
      setError('Failed to remove user');
      console.error('Error removing user:', err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.loading}>Loading access details...</div>
      </div>
    </div>;
  }

  if (error) {
    return <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.error}>{error}</div>
        <button className={styles.closeBtn} onClick={onClose}>Close</button>
      </div>
    </div>;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">&times;</button>
        <h2 className={styles.title}>Share Document</h2>

        {owner && (
          <div className={styles.ownerSection}>
            <div className={styles.ownerLabel}>
              <FaCrown className={styles.crownIcon} /> Owner
            </div>
            <div className={styles.ownerInfo}>
              {owner.avatar ? (
                <img src={owner.avatar} alt={owner.name} className={styles.ownerAvatar} />
              ) : (
                <FaUserCircle className={styles.ownerAvatarIcon} />
              )}
              <div className={styles.ownerDetails}>
                <span className={styles.ownerName}>{owner.name}</span>
                <span className={styles.ownerEmail}>{owner.email}</span>
              </div>
            </div>
          </div>
        )}

        <div className={styles.section}>
          {emails.map((email, index) => (
            <div key={index} className={styles.inviteRow}>
              <input
                className={styles.input}
                type="email"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
              />
              <select
                className={styles.select}
                value={permissions[index]}
                onChange={(e) => handlePermissionChange(index, e.target.value)}
              >
                <option>Can View</option>
                <option>Can Edit</option>
                <option>Can Comment</option>
              </select>
              {index > 0 && (
                <button 
                  className={styles.removeBtn}
                  onClick={() => handleRemoveEmail(index)}
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
          <button className={styles.addEmailBtn} onClick={handleAddEmail}>
            <FaPlus /> Add another email
          </button>
          <button 
            className={styles.inviteBtn} 
            onClick={handleSendInvite}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Send Invite'}
          </button>
        </div>

        {shared.length > 0 && (
          <div className={styles.sharedWithSection}>
            <div className={styles.sharedWithLabel}>
              <FaUserCircle className={styles.sharedWithIcon} /> Shared With
            </div>
            {shared.map(user => (
              <div className={styles.sharedUser} key={user.email}>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className={styles.avatar} />
                ) : (
                  <FaUserCircle className={styles.avatarIcon} />
                )}
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{user.name}</span>
                  <span className={styles.userEmail}>{user.email}</span>
                </div>
                <select
                  className={styles.sharedPermission}
                  value={user.permission}
                  onChange={(e) => handleUpdatePermission(user.email, e.target.value)}
                  disabled={isSaving}
                >
                  <option>Can Edit</option>
                  <option>Can Comment</option>
                  <option>Can View</option>
                </select>
                <button 
                  className={styles.deleteBtn} 
                  onClick={() => handleDelete(user.email)}
                  disabled={isSaving}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className={styles.publicSection}>
          <div className={styles.publicLabel}>
            <FaLink className={styles.linkIcon} /> Public Link Sharing
            <label className={styles.switch}>
              <input 
                type="checkbox" 
                checked={publicSharing} 
                onChange={(e) => setPublicSharing(e.target.checked)} 
                disabled={isSaving}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          {publicSharing && (
            <div className={styles.linkBox}>
              <input 
                className={styles.linkInput} 
                value={`${window.location.origin}/share/${selectedFile._id}`} 
                readOnly 
              />
              <button className={styles.copyBtn} onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/share/${selectedFile._id}`);
              }}>
                <FaCopy /> Copy Link
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareFile;
