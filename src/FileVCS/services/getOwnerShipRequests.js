import axios from 'axios';

const getOwnerShipRequests = async (userId) => {
  try {
    if (!userId) {
      throw new Error('userId is required');
    }

    const response = await axios.get('http://localhost:3000/api/file-ownership/requests', {
      params: { userId }
    });

    if (response.data.success) {
      return {
        success: true,
        data: response.data.data
      };
    } else {
      throw new Error(response.data.message || 'Failed to fetch ownership requests');
    }
  } catch (error) {
    console.error('Error fetching ownership requests:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch ownership requests'
    };
  }
};

export default getOwnerShipRequests;
