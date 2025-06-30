import React, { useEffect, useState } from "react";
import TableServices from "../TableServices/TableServices.jsx";
import api from "../../../utils/api.mjs";
import { useAuth } from "../../../contexts/AuthContext.jsx";

const Section = () => {
  const [allServices, setAllServices] = useState([]);
  const { setEmployee } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post("/getOpenServices");

        if (response.data) setAllServices(response.data);
      } catch (err) {
        if (err.status == 401) return setEmployee(null);
      }
    })();
  }, []);

  return (
    <TableServices
      title="Ordem de Serviço [Abertas]"
      allServices={allServices}
      setAllServices={setAllServices}
    />
  );
};

export default Section;
