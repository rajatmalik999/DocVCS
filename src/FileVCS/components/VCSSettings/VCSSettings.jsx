import React, { useState, useEffect } from 'react';
import styles from './VCSSettings.module.css';
import { getUserSpecificPermissions } from '../../services/getUserSpecificPermissions';

const VCSSettings = ({ userData }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeRole, setActiveRole] = useState('writer');
  const [currentPermissions, setCurrentPermissions] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  const roles = [
    { id: 'writer', description: 'Full control over the document including editing and commenting.' },
    { id: 'commenter', description: 'Can view and comment on the document.' },
    { id: 'viewer', description: 'Can only view the document content.' }
  ];

  // Define which permissions are fixed for each role
  const fixedPermissions = {
    writer: {
      canView: true,        // Fixed true
      canEdit: true,        // Fixed true
      canComment: true,     // Fixed true
      canShare: false,      // Fixed false
      canDelete: false      // Fixed false
    },
    commenter: {
      canView: true,        // Fixed true
      canEdit: false,       // Fixed false
      canComment: true,     // Fixed true
      canShare: false,      // Fixed false
      canDelete: false,     // Fixed false
      canResolve: false,    // Fixed false
      canApproveReject: false // Fixed false
    },
    viewer: {
      canView: true,
      canEdit: false,
      canShare: false,
      canDelete: false,
      canResolve: false,
      canApproveReject: false
    }
  };

  const permissions = [
    { 
      name: 'canView', 
      displayName: 'View Document', 
      info: 'Access and read the document',
      isFixed: true,
      defaultValue: true
    },
    { 
      name: 'canEdit', 
      displayName: 'Edit Content', 
      info: 'Make changes to document content',
      isFixed: true
    },
    { 
      name: 'canComment', 
      displayName: 'Add Comments', 
      info: 'Add comments to the document',
      isFixed: (role) => role === 'writer' || role === 'commenter'
    },
    { 
      name: 'canSuggest', 
      displayName: 'Suggest Changes', 
      info: 'Propose modifications to the document',
      isFixed: false
    },
    { 
      name: 'canResolve', 
      displayName: 'Resolve Comments', 
      info: 'Mark comments as resolved',
      isFixed: (role) => role === 'commenter'
    },
    { 
      name: 'canApproveReject', 
      displayName: 'Approve/Reject Suggestions', 
      info: 'Review and act on proposed changes',
      isFixed: (role) => role === 'commenter'
    },
    { 
      name: 'canShare', 
      displayName: 'Share Document', 
      info: 'Control document access and sharing',
      isFixed: true,
      defaultValue: false
    },
    { 
      name: 'canDownload', 
      displayName: 'Export/Download', 
      info: 'Save document locally',
      isFixed: false
    },
    { 
      name: 'canDelete', 
      displayName: 'Delete Document', 
      info: 'Permanently remove the document',
      isFixed: true,
      defaultValue: false
    },
    { 
      name: 'canViewVersions', 
      displayName: 'View Version History', 
      info: 'See previous versions of the document',
      isFixed: false
    }
  ];

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getUserSpecificPermissions(userData.id);
        
        // Transform the response into our permissions format
        const transformedPermissions = {};
        response.roles && Object.entries(response.roles).forEach(([role, perms]) => {
          // Merge fixed permissions with API permissions
          transformedPermissions[role] = {
            ...perms,
            ...fixedPermissions[role]
          };
        });
        
        setCurrentPermissions(transformedPermissions);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching permissions:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userData?.id) {
      fetchPermissions();
    }
  }, [userData]);

  const isPermissionFixed = (permission, role) => {
    if (typeof permission.isFixed === 'function') {
      return permission.isFixed(role);
    }
    return permission.isFixed;
  };

  const getFixedValue = (permission, role) => {
    if (fixedPermissions[role]?.[permission.name] !== undefined) {
      return fixedPermissions[role][permission.name];
    }
    return permission.defaultValue;
  };

  const handlePermissionChange = (permission) => {
    if (isPermissionFixed(permission, activeRole)) return;
    
    setHasChanges(true);
    setCurrentPermissions(prev => ({
      ...prev,
      [activeRole]: {
        ...prev[activeRole],
        [permission.name]: !prev[activeRole][permission.name]
      }
    }));
  };

  const handleReset = async () => {
    try {
      setLoading(true);
      const response = await getUserSpecificPermissions(userData.id);
      const transformedPermissions = {};
      response.roles && Object.entries(response.roles).forEach(([role, perms]) => {
        transformedPermissions[role] = {
          ...perms,
          ...fixedPermissions[role]
        };
      });
      setCurrentPermissions(transformedPermissions);
      setHasChanges(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the permissions
    console.log('Saving permissions:', currentPermissions);
    setHasChanges(false);
  };

  if (loading) {
    return <div className={styles.loading}>Loading permissions...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!currentPermissions) {
    return <div className={styles.error}>No permissions data available</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Document Access Control</h1>
        <p className={styles.subtitle}>Configure document permissions for each role</p>
      </div>

      <div className={styles.resetSection}>
        <button 
          className={`${styles.button} ${styles.resetButton}`} 
          onClick={handleReset}
          disabled={!hasChanges || loading}
        >
          Reset to Default
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.rolesPanel}>
          <h2 className={styles.sectionTitle}>Roles</h2>
          <div className={styles.rolesList}>
            {roles.map(role => (
              <button
                key={role.id}
                className={`${styles.roleButton} ${activeRole === role.id ? styles.activeRole : ''}`}
                onClick={() => setActiveRole(role.id)}
              >
                <span className={styles.roleName}>{role.id}</span>
                <p className={styles.roleDescription}>{role.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.permissionsPanel}>
          <h2 className={styles.sectionTitle}>Permissions for {activeRole}</h2>
          <div className={styles.permissionsList}>
            {permissions.map(permission => {
              const isFixed = isPermissionFixed(permission, activeRole);
              const fixedValue = isFixed ? getFixedValue(permission, activeRole) : null;
              
              return (
                <div key={permission.name} className={styles.permissionItem}>
                  <div className={styles.permissionInfo}>
                    <label className={styles.permissionLabel}>
                      <span className={styles.permissionName}>{permission.displayName}</span>
                      <span className={styles.infoIcon} title={permission.info}>ⓘ</span>
                      {isFixed && (
                        <span className={styles.fixedBadge} title="This permission cannot be changed">Fixed</span>
                      )}
                    </label>
                  </div>
                  <div className={styles.permissionControl}>
                    <input
                      type="checkbox"
                      checked={isFixed ? fixedValue : (currentPermissions[activeRole]?.[permission.name] || false)}
                      onChange={() => handlePermissionChange(permission)}
                      disabled={isFixed}
                      className={styles.checkbox}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.saveSection}>
            <button 
              className={`${styles.button} ${styles.saveButton}`} 
              onClick={handleSave}
              disabled={!hasChanges || loading}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VCSSettings;
