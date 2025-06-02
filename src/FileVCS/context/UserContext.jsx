import React, { createContext, useContext } from 'react';
import { useAuth } from '../../auth/context/AuthContext/AuthContext';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { user } = useAuth();

  const value = {
    userData: user,
    isAdmin: user?.role === 'admin',
    canEdit: user?.permissions?.includes('edit') || user?.role === 'admin',
    canDelete: user?.permissions?.includes('delete') || user?.role === 'admin',
    canShare: user?.permissions?.includes('share') || user?.role === 'admin',
    getUserDisplayName: () => user?.fullName || user?.email || 'Anonymous',
    getUserEmail: () => user?.email || '',
    getUserId: () => user?.id || null,
    getUserRole: () => user?.role || 'user',
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
