import { removeLocalStorage } from '../../../utils/localStorage';

export const logout = (setUser, navigate, showPopup) => {
  removeLocalStorage('token');
  removeLocalStorage('userData');
  setUser(null);
  navigate('/login');
  showPopup('Logged out successfully', 'success');
}; 