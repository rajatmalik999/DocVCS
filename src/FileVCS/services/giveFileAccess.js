import axios from 'axios';

export const giveFileAccess = async (fileId, permissions, visibilityStatus, googleFileId, ownerId) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/file-permissions/${fileId}/give-access`, {
      permissions,
      visibilityStatus,
      googleFileId,
      ownerId
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { 
      success: false, 
      message: 'Failed to give file access',
      data: null 
    };
  }
};
