import React from "react";
import { useParams } from "react-router-dom";

const LocationInfo = () => {
  const { location } = useParams();

  return (
    <div className="centeredContent">
      <h1>{location}</h1>
      <h2>Description</h2>
      <h2>Time Lapses</h2>
      <h2>How We Chose This Location</h2>
      <h2>Map</h2>
    </div>
  );
};

export default LocationInfo;
