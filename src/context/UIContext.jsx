import React, { createContext, useContext, useState } from "react";

const UIContext = createContext();

const useUI = () => useContext(UIContext);

const UIProvider = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <UIContext.Provider value={{ isMenuOpen, setMenuOpen }}>
      {children}
    </UIContext.Provider>
  );
};

export { UIProvider, useUI };
