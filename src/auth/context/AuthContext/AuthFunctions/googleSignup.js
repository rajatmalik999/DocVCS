import { setLocalStorage, removeLocalStorage } from '../../../utils/localStorage';
import { handleGoogleSignupResponse } from '../../../services';

export const googleSignup = async (response, setUser, showPopup, navigate) => {
  try {
    const { success, data } = await handleGoogleSignupResponse(response);
    if (success && data) {
      setLocalStorage('token', data.token);
      setLocalStorage('userData', data.user);
      setUser(data.user);
      showPopup(data.message || 'Welcome! Your account has been created successfully.', 'success');
      navigate('/dashboard', { replace: true });
      return data;
    }
    throw new Error('Signup failed - no data received');
  } catch (error) {
    removeLocalStorage('token');
    removeLocalStorage('userData');
    setUser(null);
    showPopup(error.message || 'Google signup failed', 'error');
    throw error;
  }
}; 