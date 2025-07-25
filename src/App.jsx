import { BrowserRouter } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "@components/Main/Main";

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
        <Main />
      </BrowserRouter>
    </>
  );
};

export default App;
