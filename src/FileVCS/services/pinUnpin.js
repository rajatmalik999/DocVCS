import axios from 'axios';

// Function to pin a file
const pinFile = async ({ fileId, userId }) => {
  try {
    const response = await axios.post('http://localhost:3000/api/files/pin', {
      fileId,
      userId
    });

    if (response.data.file) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to pin file');
    }
  } catch (error) {
    console.error('Error in pinFile service:', error);
    throw error;
  }
};

// Function to unpin a file
const unpinFile = async ({ fileId, userId }) => {
  try {
    // For DELETE requests with a body, we need to send the data in the request config
    const response = await axios.delete('http://localhost:3000/api/files/unpin', {
      data: {
        fileId,
        userId
      }
    });

    if (response.data.file) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to unpin file');
    }
  } catch (error) {
    console.error('Error in unpinFile service:', error);
    throw error;
  }
};

export {
  pinFile,
  unpinFile
};
