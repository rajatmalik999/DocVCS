import React, { createContext, useContext, useState } from 'react';

const FileVersionContext = createContext();

export const FileVersionProvider = ({ children }) => {
  const [selectedVersionPdf, setSelectedVersionPdf] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearSelectedVersion = () => {
    setSelectedVersionPdf(null);
    setError(null);
  };

  return (
    <FileVersionContext.Provider 
      value={{ 
        selectedVersionPdf, 
        setSelectedVersionPdf,
        isLoading,
        setIsLoading,
        error,
        setError,
        clearSelectedVersion
      }}
    >
      {children}
    </FileVersionContext.Provider>
  );
};

export const useFileVersion = () => {
  const context = useContext(FileVersionContext);
  if (!context) {
    throw new Error('useFileVersion must be used within a FileVersionProvider');
  }
  return context;
}; 