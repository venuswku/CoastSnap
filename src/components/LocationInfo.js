import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Stack } from "@mui/material";

const LocationInfo = (props) => {
  const { location } = useParams();
  const { scLocations } = props;
  const info = scLocations.filter(loc => loc.name === location)[0];

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="centeredContent">
      <h1>{location}</h1>
      <h2>Description</h2>
      <p>{info.description}</p>
      <h2>Time Lapses</h2>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        {info.timelapseVids.map(vid => <ReactPlayer url={vid} key={vid} />)}
      </Stack>
      <h2>How We Chose This Location</h2>
      <h2>Map</h2>
    </div>
  );
};

export default LocationInfo;
