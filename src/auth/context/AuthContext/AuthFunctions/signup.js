import { handleNormalSignup } from '../../../services';

export const signup = async (userData, handleAuthSuccess, showPopup, navigate) => {
  try {
    const { success, data } = await handleNormalSignup(userData);
    if (success) {
      if (data.requiresVerification) {
        showPopup(data.message || 'Registration successful! Please check your email to verify your account.', 'success');
        navigate('/pre-email-verification');
      } else if (data.token) {
        handleAuthSuccess(data);
        showPopup(data.message || 'Registration successful! Welcome aboard!', 'success');
        navigate('/dashboard');
      }
    }
    return data;
  } catch (error) {
    showPopup(error.message || 'Signup failed', 'error');
    throw error;
  }
};  