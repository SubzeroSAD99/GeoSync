import React from "react";
import EditClients from "../../components/Clients/EditClients/EditClients";
import { useParams } from "react-router-dom";

const EditClientsPage = () => {
  const params = useParams();

  return <EditClients id={params.id} />;
};

export default EditClientsPage;
