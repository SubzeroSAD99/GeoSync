import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main/Main.jsx";
import Menu from "./components/Menu/Menu.jsx";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Main />
    </BrowserRouter>
  );
}

export default App;
