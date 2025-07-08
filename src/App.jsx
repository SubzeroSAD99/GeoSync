import { BrowserRouter, useLocation } from "react-router-dom";
import Main from "./components/Main/Main.jsx";
import Menu from "./components/Menu/Menu.jsx";
import { useUI } from "./contexts/UIContext.jsx";
import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext.jsx";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        rtl={false}
        transition={Bounce}
      />

      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </>
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
