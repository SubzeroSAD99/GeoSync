import React, { useEffect, useState } from "react";
import Services from "../Services/Services.jsx";
import api from "../../utils/api.mjs";
import { useAuth } from "../../contexts/AuthContext.jsx";

const ClosedServices = () => {
  const [allServices, setAllServices] = useState([]);
  const { setEmployee } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/getClosedServices");

        if (response.data) setAllServices(response.data);
      } catch (err) {
        if (err.status == 401) return setEmployee(null);
      }
    })();
  }, []);

  return (
    <Services
      title="Ordem de Serviço [Fechadas]"
      allServices={allServices}
      setAllServices={setAllServices}
    />
  );
};

export default ClosedServices;
