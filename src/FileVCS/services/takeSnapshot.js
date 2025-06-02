import axios from 'axios';

/**
 * Creates a new version snapshot of a file
 * @param {string} fileId - The file ID
 * @param {string} userId - The user ID
 * @param {string} commitMessage - The commit message
 * @param {string} version - The version number/string
 * @returns {Promise<Object>} - The created version data
 */
const takeSnapshot = async (fileId, userId, commitMessage, version) => {
  try {
    const response = await axios.post('http://localhost:3000/api/versions/commit', {
      fileId,
      userId,
      commitMessage,
      version
    });

    return response.data;
  } catch (error) {
    console.error('Error creating file version:', error);
    throw error;
  }
};

export default takeSnapshot;
