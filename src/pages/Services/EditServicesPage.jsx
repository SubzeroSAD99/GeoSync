import React from "react";
import EditServices from "@components/Services/EditServices/EditServices";
import { useParams } from "react-router-dom";

const EditServicesPage = () => {
  const params = useParams();
  return <EditServices id={params.id} />;
};

export default EditServicesPage;
