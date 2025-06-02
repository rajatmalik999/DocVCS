import axios from 'axios';

const revokeOwnershipRequest = async (userId, fileId) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/file-ownership/revoke`, {
      userId,
      fileId
    });
    
    if (response.data.success) {
      return {
        success: true,
        message: response.data.message
      };
    } else {
      throw new Error(response.data.message || 'Failed to revoke ownership request');
    }
  } catch (error) {
    console.error('Error revoking ownership request:', error);
    return {
      success: false,
      message: error.response?.data?.message || error.message
    };
  }
};

export default revokeOwnershipRequest; 