import axios from 'axios';

const getFileVersions = async (fileId) => {
  try {
    const response = await axios.post('http://localhost:3000/api/versions/versions', { fileId });
    return response.data;
  } catch (error) {
    console.error('Error fetching file versions:', error);
    throw error;
  }
};

export default getFileVersions;
