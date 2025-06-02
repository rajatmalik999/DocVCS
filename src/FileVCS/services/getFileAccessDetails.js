import axios from 'axios';

export const getFileAccessDetails = async (fileId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/file-permissions/${fileId}/access-details`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch file access details' };
  }
};
