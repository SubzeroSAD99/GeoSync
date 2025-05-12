import { BrowserRouter, useLocation } from "react-router-dom";
import Main from "./components/Main/Main.jsx";
import Menu from "./components/Menu/Menu.jsx";
import { useUI } from "./contexts/UIContext.jsx";
import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

const AppContent = () => {
  const { isMenu, setIsMenu } = useUI();
  const location = useLocation();
  const { employee } = useAuth();

  useEffect(() => {
    setIsMenu(location.pathname !== "/login");
  }, [location.pathname, setIsMenu]);

  return (
    <>
      {isMenu && employee && <Menu />}
      <Main />
    </>
  );
};

export default App;
