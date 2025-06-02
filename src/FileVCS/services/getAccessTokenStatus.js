import axios from 'axios';

/**
 * Checks if a user has a valid Google access token
 * @param {string} userId - The ID of the user to check
 * @returns {Promise<Object>} Response containing success status and token existence
 */
const getAccessTokenStatus = async (userId) => {
  try {
    if (!userId) {
      throw new Error('userId is required');
    }
    const response = await axios.get(`http://localhost:3000/api/access/token/${userId}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to check access token status',
      data: {
        hasAccessToken: false,
        userId,
        reason: error.response?.data?.data?.reason || 'API_ERROR'
      }
    };
  }
};

export default getAccessTokenStatus;
