import axios from 'axios';

/**
 * Creates a new ownership transfer request for a file
 * @param {string} userId - Current user's ID
 * @param {string} userEmail - Current user's email
 * @param {string} fileId - ID of the file to transfer
 * @param {string} fileGoogleId - Google Drive ID of the file
 * @param {string} receiverEmail - Email of the user to transfer ownership to
 * @returns {Promise<Object>} Response from the server
 */
export const createOwnershipTransferRequest = async (
  userId,
  userEmail,
  fileId,
  fileGoogleId,
  receiverEmail
) => {
  try {
    const response = await axios.post('http://localhost:3000/api/file-ownership/request', {
      userId,
      userEmail,
      fileId,
      fileGoogleId,
      receiverEmail
    });

    return response.data;
  } catch (error) {
    // Extract error message from response if available, otherwise use default
    throw error.response?.data || {
      success: false,
      message: 'Failed to create ownership transfer request',
      error: error.message
    };
  }
};
