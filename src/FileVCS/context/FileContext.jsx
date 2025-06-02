import React, { createContext, useContext, useState } from 'react';

const FileContext = createContext();

export const useFile = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFile must be used within a FileProvider');
  }
  return context;
};

export const FileProvider = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const value = {
    selectedFile,
    setSelectedFile,
  };

  return (
    <FileContext.Provider value={value}>
      {children}
    </FileContext.Provider>
  );
};
