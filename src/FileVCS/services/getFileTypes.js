import axios from 'axios';

const getFileTypes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/file-types/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching file types:', error);
    return {
      success: false,
      message: 'Failed to fetch file types',
      data: []
    };
  }
};

export default getFileTypes;
