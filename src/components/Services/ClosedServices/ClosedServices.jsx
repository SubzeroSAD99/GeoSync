import React, { useEffect, useState } from "react";
import TableServices from "./../TableServices/TableServices";
import api from "@utils/api.mjs";
import { useAuth } from "@contexts/AuthContext.jsx";

const ClosedServices = () => {
  const [allServices, setAllServices] = useState([]);
  const { setUserLogged } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/service/getAllClosed");

        if (response.data) setAllServices(response.data);
      } catch (err) {
        if (err.status == 401) return setUserLogged(null);
      }
    })();
  }, []);

  return (
    <TableServices
      title="Ordem de Serviço [Fechadas]"
      allServices={allServices}
      setAllServices={setAllServices}
    />
  );
};

export default ClosedServices;
