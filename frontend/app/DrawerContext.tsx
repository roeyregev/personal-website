"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface DrawerContextType {
  showDrawerNew: boolean;
  setShowDrawerNew: React.Dispatch<React.SetStateAction<boolean>>;
  closeDrawerNew: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showDrawerNew, setShowDrawerNew] = useState<boolean>(false);

  const closeDrawerNew = () => {
    setShowDrawerNew(false);
  };

  return (
    <DrawerContext.Provider value={{ showDrawerNew, setShowDrawerNew, closeDrawerNew }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('useDrawerContext must be used within a DrawerProvider');
  }
  return context;
};