import axios from 'axios';

/**
 * Get permissions for a specific file
 * @param {string} fileId - The ID of the file to get permissions for
 * @returns {Promise<Object>} The file permissions data
 * @throws {Error} If the API call fails
 */
export const getFilePermissions = async (fileId) => {
  try {
    if (!fileId) {
      throw new Error('File ID is required');
    }

    console.log('Requesting permissions for fileId:', fileId);
    const response = await axios.post('http://localhost:3000/api/file-permissions/permissions', {
      fileId: fileId
    });
    console.log('File Permissions Response:', response.data);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to get file permissions');
    }

    return response.data.data;
  } catch (error) {
    console.error('Error in getFilePermissions:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to get file permissions');
  }
};
