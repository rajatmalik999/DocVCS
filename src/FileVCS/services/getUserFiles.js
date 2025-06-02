import axios from 'axios';

/**
 * Fetches all files accessible to a user
 * @param {string} userId - The ID of the user
 * @returns {Promise<Object>} Response containing the user's files
 */
const getUserFiles = async (userId) => {
  try {
    if (!userId) {
      throw new Error('userId is required');
    }

    const response = await axios.get(`http://localhost:3000/api/files/user/${userId}/files`);
    
    // Transform dates and ensure consistent data structure
    if (response.data.success && Array.isArray(response.data.data)) {
      response.data.data = response.data.data.map(file => ({
        ...file,
        createdAt: file.createdAt ? new Date(file.createdAt) : null,
        updatedAt: file.updatedAt ? new Date(file.updatedAt) : null,
        fileTags: Array.isArray(file.fileTags) ? file.fileTags : [],
        isPinned: !!file.isPinned,
        userRole: file.userRole || 'none'
      }));
    }

    return response.data;
  } catch (error) {
    console.error('Get user files error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch user files',
      data: []
    };
  }
};

export default getUserFiles;
