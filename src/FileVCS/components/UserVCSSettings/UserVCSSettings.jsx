import React, { useState } from 'react';
import styles from './UserVCSSetting.module.css';

const UserVCSSettings = ({ userData, onClose, isModal = false }) => {
  const permissionMappings = {
    'View Document': 'canView',
    'Edit Content': 'canEdit',
    'Add Comments': 'canComment',
    'Resolve Comments': 'canResolve',
    'Suggest Changes': 'canSuggest',
    'Approve/Reject Suggestions': 'canApproveReject',
    'Export/Download': 'canDownload',
    'Share Document': 'canShare',
    'Delete Document': 'canDelete',
    'View Version History': 'canViewVersions'
  };

  const permissions = [
    { name: 'View Document', info: 'Access and read the document' },
    { name: 'Edit Content', info: 'Make changes to document content' },
    { name: 'Add Comments', info: 'Add comments to the document' },
    { name: 'Resolve Comments', info: 'Mark comments as resolved' },
    { name: 'Suggest Changes', info: 'Propose modifications to the document' },
    { name: 'Approve/Reject Suggestions', info: 'Review and act on proposed changes' },
    { name: 'Export/Download', info: 'Save document locally' },
    { name: 'Share Document', info: 'Control document access and sharing' },
    { name: 'Delete Document', info: 'Permanently remove the document' },
    { name: 'View Version History', info: 'See previous versions of the document' }
  ];

  const initialPermissions = {};
  permissions.forEach(perm => {
    const apiFlag = permissionMappings[perm.name];
    initialPermissions[perm.name] = userData?.permissionFlags?.[apiFlag] || false;
  });

  const [currentPermissions, setCurrentPermissions] = useState(initialPermissions);
  const [hasChanges, setHasChanges] = useState(false);

  const handlePermissionChange = (permission) => {
    setHasChanges(true);
    setCurrentPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission]
    }));
  };

  const handleReset = () => {
    setCurrentPermissions(initialPermissions);
    setHasChanges(false);
  };

  const handleSave = () => {
    // Convert permissions back to API format
    const apiPermissions = {};
    Object.entries(currentPermissions).forEach(([permName, value]) => {
      const apiFlag = permissionMappings[permName];
      apiPermissions[apiFlag] = value;
    });

    console.log('Saving user permissions:', {
      userId: userData.user._id,
      permissions: apiPermissions
    });
    setHasChanges(false);
    if (onClose) {
      onClose();
    }
  };

  const containerClass = isModal ? styles.modalContainer : styles.container;

  return (
    <div className={containerClass}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Document Access Control</h1>
        <p className={styles.subtitle}>Configure document permissions for {userData.email}</p>
      </div>

      <div className={styles.resetSection}>
        <button 
          className={`${styles.button} ${styles.resetButton}`} 
          onClick={handleReset}
          disabled={!hasChanges}
        >
          Reset to Default
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.userPanel}>
          <h2 className={styles.sectionTitle}>User Details</h2>
          <div className={styles.userCard}>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{userData.email}</span>
              <span className={styles.userRole}>Role: {userData.role}</span>
              {userData.googlePermissionId && (
                <span className={styles.googleId}>Google Permission ID: {userData.googlePermissionId}</span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.permissionsPanel}>
          <h2 className={styles.sectionTitle}>Permissions</h2>
          <div className={styles.permissionsList}>
            {permissions.map(permission => (
              <div key={permission.name} className={styles.permissionItem}>
                <div className={styles.permissionInfo}>
                  <label className={styles.permissionLabel}>
                    <span className={styles.permissionName}>{permission.name}</span>
                    <span className={styles.infoIcon} title={permission.info}>ⓘ</span>
                  </label>
                </div>
                <div className={styles.permissionControl}>
                  <input
                    type="checkbox"
                    checked={currentPermissions[permission.name]}
                    onChange={() => handlePermissionChange(permission.name)}
                    className={styles.checkbox}
                    disabled={userData.role === 'owner'}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.saveSection}>
            <button 
              className={`${styles.button} ${styles.saveButton}`} 
              onClick={handleSave}
              disabled={!hasChanges || userData.role === 'owner'}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserVCSSettings;

