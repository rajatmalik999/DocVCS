import React, { createContext, useContext, useState, useCallback } from 'react';

const PopupContext = createContext(null);

export const PopupProvider = ({ children }) => {
  const [popup, setPopup] = useState({
    show: false,
    message: '',
    type: 'success', // 'success' or 'error'
  });

  const showPopup = useCallback((message, type = 'success') => {
    setPopup({
      show: true,
      message,
      type,
    });

    // Automatically hide popup after 2 seconds
    setTimeout(() => {
      setPopup(prev => ({ ...prev, show: false }));
    }, 2000);
  }, []);

  const hidePopup = useCallback(() => {
    setPopup(prev => ({ ...prev, show: false }));
  }, []);

  const value = {
    popup,
    showPopup,
    hidePopup,
  };

  return (
    <PopupContext.Provider value={value}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
}; 