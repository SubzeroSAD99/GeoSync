import React from "react";
import EditEquipments from "@components/Management/Equipments/EditEquipments/EditEquipments";
import { useParams } from "react-router-dom";

const EditEquipmentsPage = () => {
  const params = useParams();
  return <EditEquipments id={params.id} />;
};

export default EditEquipmentsPage;
