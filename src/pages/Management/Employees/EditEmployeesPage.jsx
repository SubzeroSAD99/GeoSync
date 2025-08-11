import React from "react";
import EditEmployees from "@components/Management/Employees/EditEmployees/EditEmployees";
import { useParams } from "react-router-dom";

const EditEmployeesPage = () => {
  const params = useParams();
  return <EditEmployees id={params.id} />;
};

export default EditEmployeesPage;
