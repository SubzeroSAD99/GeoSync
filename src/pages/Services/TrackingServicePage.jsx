import React from "react";
import TrackingService from "@components/Services/TrackingService/TrackingService";
import { useParams } from "react-router-dom";

const TrackingServicePage = () => {
  const params = useParams();

  return <TrackingService id={params.id} chk={params.chk} />;
};

export default TrackingServicePage;
