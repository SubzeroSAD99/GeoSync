import React from "react";
import Services from "../Services/Services.jsx";

const ClosedServices = () => {
  const allServices = [
    {
      clientName: "ANTONIO KAUAN LOPES FREITAS",
      serviceType: "PLANIMETRIA",
      employeeName: "ANTONIO KAUAN LOPES FREITAS",
      municipality: "MARCO",
      priority: "BAIXA",
      stats: "FECHADA",
      createdDate: "17/04/2025 - 07:40:25",
    },

    {
      clientName: "ANTONIO KAUAN LOPES FREITAS",
      serviceType: "PLANIMETRIA",
      employeeName: "ANTONIO KAUAN LOPES FREITAS",
      municipality: "MARCO",
      priority: "BAIXA",
      stats: "FECHADA",
      createdDate: "17/04/2025 - 07:40:25",
    },

    {
      clientName: "ANTONIO KAUAN LOPES FREITAS",
      serviceType: "PLANIMETRIA",
      employeeName: "ANTONIO KAUAN LOPES FREITAS",
      municipality: "MARCO",
      priority: "BAIXA",
      stats: "FECHADA",
      createdDate: "17/04/2025 - 07:40:25",
    },
    {
      clientName: "ANTONIO KAUAN LOPES FREITAS",
      serviceType: "PLANIMETRIA",
      employeeName: "ANTONIO KAUAN LOPES FREITAS",
      municipality: "MARCO",
      priority: "BAIXA",
      stats: "FECHADA",
      createdDate: "17/04/2025 - 07:40:25",
    },
  ];

  return (
    <Services
      title="Ordem de Serviço [Fechadas]"
      redirect="/"
      label="Serviços Abertos"
      allServices={allServices}
    />
  );
};

export default ClosedServices;
