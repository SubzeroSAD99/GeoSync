import { useAuth } from "@contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "./Loading/Loading";

export function RequireAuth() {
  const { userLogged, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!userLogged) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return <Outlet />;
}
