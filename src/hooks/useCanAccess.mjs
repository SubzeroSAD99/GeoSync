import { useAuth } from "../contexts/AuthContext";

const useCanAccess = () => {
  const { userLogged, permissions } = useAuth();

  const canAccess = (resource, action) => {
    if (!userLogged || !permissions) return false;

    return permissions[userLogged.role]?.some(
      (it) => it.resource === resource && it.actions?.includes(action)
    );
  };

  return canAccess;
};

export default useCanAccess;
