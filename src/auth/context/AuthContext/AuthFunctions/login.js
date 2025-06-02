import { handleLogin } from '../../../services';

export const login = async (email, password, handleAuthSuccess, showPopup, navigate) => {
  try {
    const result = await handleLogin(email, password);
    if (result.requiresVerification) {
      return result;
    }
    if (result.success) {
      handleAuthSuccess(result.data);
      showPopup(result.data.message || 'Login successful!', 'success');
      navigate('/dashboard');
    }
    return result.data;
  } catch (error) {
    showPopup(error.message || 'Login failed', 'error');
    throw error;
  }
}; 