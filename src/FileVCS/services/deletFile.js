import axios from 'axios';

/**
 * Deletes a file from the system
 * @param {string} userId - ID of the user deleting the file
 * @param {string} fileId - ID of the file to delete
 * @returns {Promise<Object>} Response from the server
 */
const deleteFile = async (userId, fileId) => {
  try {
    const response = await axios.delete('http://localhost:3000/api/files/delete', {
      data: {
        userId,
        fileId
      }
    });

    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
        data: response.data.data
      };
    } else {
      throw new Error(response.data.message || 'Failed to delete file');
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
      error: error.response?.data?.error || error.message
    };
  }
};

export default deleteFile;
