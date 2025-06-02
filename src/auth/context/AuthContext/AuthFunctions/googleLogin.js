import { setLocalStorage, removeLocalStorage } from '../../../utils/localStorage';
import { handleGoogleLogin } from '../../../services';

export const googleLogin = async (response, setUser, showPopup, navigate) => {
  try {
    const { success, data, isNewUser } = await handleGoogleLogin(response);
    if (success && data) {
      setLocalStorage('token', data.token);
      setLocalStorage('userData', data.user);
      setUser(data.user);
      if (isNewUser) {
        showPopup(data.message || 'Welcome! Your account has been created successfully.', 'success');
      } else {
        showPopup(data.message || 'Welcome back!', 'success');
      }
      navigate('/dashboard', { replace: true });
      return { ...data, isNewUser };
    }
    throw new Error('Authentication failed - no data received');
  } catch (error) {
    removeLocalStorage('token');
    removeLocalStorage('userData');
    setUser(null);
    showPopup(error.message || 'Google authentication failed', 'error');
    throw error;
  }
}; 