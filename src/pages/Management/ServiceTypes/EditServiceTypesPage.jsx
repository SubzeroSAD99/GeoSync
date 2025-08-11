import React from "react";
import EditServiceTypes from "@components/Management/ServiceTypes/EditServiceTypes/EditServiceTypes";
import { useParams } from "react-router-dom";

const EditServiceTypesPage = () => {
  const params = useParams();
  return <EditServiceTypes id={params.id} />;
};

export default EditServiceTypesPage;
