import axios from 'axios';

/**
 * Accepts an ownership transfer request for a file
 * @param {string} userId - ID of the user accepting the request
 * @param {string} ownershipRequestId - ID of the ownership request being accepted
 * @returns {Promise<Object>} Response from the server
 */
const acceptOwnershipRequest = async (userId, ownershipRequestId) => {
  try {
    const response = await axios.post('http://localhost:3000/api/file-ownership/accept', {
      userId,
      ownershipRequestId
    });

    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
        data: response.data.data
      };
    } else {
      throw new Error(response.data.message || 'Failed to accept ownership request');
    }
  } catch (error) {
    console.error('Error accepting ownership request:', error);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
      error: error.response?.data?.error || error.message
    };
  }
};

export default acceptOwnershipRequest;
