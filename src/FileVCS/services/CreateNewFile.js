import axios from 'axios';

/**
 * Creates a new file in both Google Drive and local database
 * @param {Object} fileData
 * @param {string} fileData.fileOwnerId - ID of the file owner
 * @param {string} fileData.fileName - Name of the file
 * @param {string} fileData.fileDescription - Description of the file
 * @param {Array<string>} fileData.fileTags - Array of tags for the file
 * @param {string} fileData.fileTypeId - ID of the file type from FileType model
 * @returns {Promise<Object>} Response containing created file data including Google Drive URL
 */
const createNewFile = async ({
  fileOwnerId,
  fileName,
  fileDescription = '',
  fileTags = [],
  fileTypeId
}) => {
  try {
    const response = await axios.post('http://localhost:3000/api/files/create', {
      fileOwnerId,
      fileName,
      fileDescription,
      fileTags,
      fileTypeId
    });

    return response.data;
  } catch (error) {
    console.error('Create file error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create file',
      data: null
    };
  }
};

export default createNewFile;
