
import React, { createContext, useState, useContext } from 'react';

export const AvisContext = createContext();
export const AvisProvider = ({ children }) => {
  const [data, setData] = useState(null);

  return (
    <AvisContext.Provider value={{ data, setData }}>
      {children}
    </AvisContext.Provider>
  );
};

export const useAvis = () => {
  return useContext(AvisContext);
};