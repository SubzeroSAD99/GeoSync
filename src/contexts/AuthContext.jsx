// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api.mjs";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .post("/validate")
      .then((res) => {
        if (res.data) return setEmployee(res.data.employee);
        throw new Error("Não autenticado");
      })
      .catch(() => {
        setEmployee(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{ employee, setEmployee, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
