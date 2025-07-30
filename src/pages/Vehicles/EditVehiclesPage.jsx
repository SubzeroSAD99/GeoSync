import React from "react";
import EditVehicles from "@components/Vehicles/EditVehicles/EditVehicles.jsx";
import { useParams } from "react-router-dom";

const EditVehiclesPage = () => {
  const params = useParams();
  return <EditVehicles id={params.id} />;
};

export default EditVehiclesPage;
