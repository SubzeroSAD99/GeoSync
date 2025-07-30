import React from "react";
import useCanAccess from "../hooks/useCanAccess.mjs";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ resource, action, children }) => {
  const canAccess = useCanAccess();

  if (!canAccess(resource, action)) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
