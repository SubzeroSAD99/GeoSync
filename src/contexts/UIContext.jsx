import React, { createContext, useContext, useState } from "react";

const UIContext = createContext();

const useUI = () => useContext(UIContext);

const UIProvider = ({ children }) => {
  const [isMenu, setIsMenu] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <UIContext.Provider value={{ isMenuOpen, setMenuOpen, isMenu, setIsMenu }}>
      {children}
    </UIContext.Provider>
  );
};

export { UIProvider, useUI };
