import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UIProvider } from "./context/UIContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <UIProvider>
        <App />
      </UIProvider>
    </ThemeProvider>
  </StrictMode>
);
