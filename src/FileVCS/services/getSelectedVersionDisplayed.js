import axios from 'axios';

/**
 * Fetches a specific version of a file and returns it as a PDF blob
 * @param {string} fileId - The Google Drive file ID
 * @param {string} userId - The user's ID
 * @param {string} extension - The file extension
 * @returns {Promise<Blob>} - Returns a blob of the PDF file
 */
const getSelectedVersionDisplayed = async (fileId, userId, extension) => {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3000/api/files/version',
      responseType: 'blob',
      data: {
        fileId,
        userId,
        extension
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/pdf'
      }
    });

    // Create a blob URL from the response
    const blob = new Blob([response.data], { type: 'application/pdf' });
    return blob;
  } catch (error) {
    console.error('Error fetching file version:', error);
    throw error;
  }
};

export default getSelectedVersionDisplayed;
