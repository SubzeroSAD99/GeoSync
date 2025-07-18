// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api.mjs";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .post("/validate")
      .then((res) => {
        if (res.data) return setUserLogged(res.data.employee);
        throw new Error("Não autenticado");
      })
      .catch(() => {
        setUserLogged(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{ userLogged, setUserLogged, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
