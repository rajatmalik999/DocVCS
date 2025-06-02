import axios from 'axios';

const getFileById = async (fileGoogleId, userId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/files/get-file`, {
      params: {
        fileGoogleId,
        userId
      },
      responseType: 'blob',
      headers: {
        'Accept': '*/*'
      }
    });
    
    const metadata = {
      success: response.headers['x-success'] === 'true',
      message: response.headers['x-message'],
      fileName: response.headers['x-file-name'],
      fileId: response.headers['x-file-id'],
      fileOwner: response.headers['x-file-owner'],
      fileSize: parseInt(response.headers['x-file-size'], 10),
      createdAt: new Date(response.headers['x-file-created']),
      updatedAt: new Date(response.headers['x-file-updated']),
      contentType: response.headers['content-type']
    };

    return {
      blob: response.data,
      metadata
    };
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      throw new Error(data.message || `Server error: ${status}`);
    }
    throw error;
  }
};

export default getFileById;
