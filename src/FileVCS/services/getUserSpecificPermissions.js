import axios from 'axios';

/**
 * Get user-specific permissions from the server
 * @param {string} userId - The ID of the user to get permissions for
 * @returns {Promise<Object>} The user permissions data
 * @throws {Error} If the API call fails
 */
export const getUserSpecificPermissions = async (userId) => {
  try {
    if (!userId) {
      throw new Error('userId is required in request body');
    }

    const response = await axios.post('http://localhost:3000/api/user-permissions/get', {
      userId: userId
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to get user permissions');
    }

    const { data } = response.data;

    // Transform the data to make it easier to use in the frontend
    const transformedData = {
      userId: data.userId,
      email: data.email,
      roles: data.createdRoles.reduce((acc, role) => {
        acc[role.role] = role.permissions;
        return acc;
      }, {}),
      generatedAt: new Date(data.generatedAt),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    };

    return transformedData;
  } catch (error) {
    console.error('Error in getUserSpecificPermissions:', error);
    if (error.response?.status === 404) {
      throw new Error('User permissions not found');
    } else if (error.response?.status === 400) {
      throw new Error('Invalid user ID provided');
    }
    throw new Error(error.response?.data?.message || error.message || 'Failed to get user permissions');
  }
};

/**
 * Check if a user has a specific permission for a given role
 * @param {Object} userPermissions - The user permissions object returned from getUserSpecificPermissions
 * @param {string} role - The role to check permissions for (e.g., 'writer', 'commenter', 'viewer')
 * @param {string} permission - The specific permission to check (e.g., 'canEdit', 'canComment')
 * @returns {boolean} Whether the user has the specified permission
 */
export const hasPermission = (userPermissions, role, permission) => {
  if (!userPermissions?.roles || !role || !permission) {
    return false;
  }

  return userPermissions.roles[role]?.[permission] || false;
};

/**
 * Get all permissions for a specific role
 * @param {Object} userPermissions - The user permissions object returned from getUserSpecificPermissions
 * @param {string} role - The role to get permissions for
 * @returns {Object|null} The permissions object for the role, or null if not found
 */
export const getRolePermissions = (userPermissions, role) => {
  if (!userPermissions?.roles || !role) {
    return null;
  }

  return userPermissions.roles[role] || null;
};

/**
 * Get all available roles for the user
 * @param {Object} userPermissions - The user permissions object returned from getUserSpecificPermissions
 * @returns {string[]} Array of role names
 */
export const getAvailableRoles = (userPermissions) => {
  if (!userPermissions?.roles) {
    return [];
  }

  return Object.keys(userPermissions.roles);
};
