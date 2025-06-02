import { setLocalStorage, removeLocalStorage } from '../../../utils/localStorage';

export const handleAuthSuccess = (data, setUser) => {
  try {
    if (data?.token && data?.user) {
      setLocalStorage('token', data.token);
      setLocalStorage('userData', data.user);
      setUser(data.user);
      return data;
    }
    throw new Error('Invalid authentication data');
  } catch (error) {
    console.error('Error in handleAuthSuccess:', error);
    removeLocalStorage('token');
    removeLocalStorage('userData');
    setUser(null);
    throw error;
  }
}; 