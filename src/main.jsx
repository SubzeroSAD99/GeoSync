import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UIProvider } from "@contexts/UIContext.jsx";
import { ThemeProvider } from "@contexts/ThemeContext.jsx";
import { AuthProvider } from "@contexts/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <UIProvider>
          <App />
        </UIProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
