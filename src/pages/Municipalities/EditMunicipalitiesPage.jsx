import React from "react";
import EditMunicipalities from "../../components/Municipalities/EditMunicipalities/EditMunicipalities";
import { useParams } from "react-router-dom";

const EditMunicipalitiesPage = () => {
  const params = useParams();
  return <EditMunicipalities id={params.id} />;
};

export default EditMunicipalitiesPage;
