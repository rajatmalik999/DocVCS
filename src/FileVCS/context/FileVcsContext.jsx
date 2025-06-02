import React, { createContext, useContext, useState, useCallback } from 'react';
import { useUser } from './UserContext';

const FileVCSContext = createContext(null);

export const FileVCSProvider = ({ children }) => {
  const userContext = useUser();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshFileList = useCallback(() => {
    console.log('Refreshing file list...'); // Debug log
    setRefreshTrigger(current => {
      console.log('Current trigger:', current, 'Next trigger:', current + 1); // Debug log
      return current + 1;
    });
  }, []);

  const value = {
    ...userContext,
    refreshTrigger,
    refreshFileList,
  };

  return (
    <FileVCSContext.Provider value={value}>
      {children}
    </FileVCSContext.Provider>
  );
};

export const useFileVCS = () => {
  const context = useContext(FileVCSContext);
  if (!context) {
    throw new Error('useFileVCS must be used within a FileVCSProvider');
  }
  return context;
}; 