import React, { createContext, useContext, useState, useEffect } from 'react';

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  // Load history from localStorage on initial render
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('movieHistory')) || [];
    setHistory(storedHistory);
  }, []);

  const addToHistory = (movie) => {
    if (!history.find((item) => item.id === movie.id)) {
      const updatedHistory = [...history, movie];
      setHistory(updatedHistory);

      // Save updated history to localStorage
      localStorage.setItem('movieHistory', JSON.stringify(updatedHistory));
    }
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};
