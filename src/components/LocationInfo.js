import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { Stack, Button } from "@mui/material";
import { UploadButton } from "./Navbar";

const scLocationInfo = require("../data/locations.json");

const LocationInfo = () => {
  const { location } = useParams();
  const info = scLocationInfo.filter(loc => loc.name === location)[0];
  const image = require(`../images/${info.image}`);
  
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="centeredContent">
      <h1>{location}</h1>
      <img className="locationImage" src={image} alt={location}/>
      {/* <h2>Description</h2>
      <p>{info.description}</p> */}
      <Link to={"/upload?location=" + location} className="button">
        <UploadButton variant="contained">Upload Photo for {location}</UploadButton>
      </Link>
      <h2>Time Lapses</h2>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        {info.timelapseVids.map(vid => <ReactPlayer url={vid} width="80%" key={vid} />)}
      </Stack>
      <h2>How We Chose This Location</h2>
      {info.reasonsForChosingLocation.map((reason, i) => <p key={i}>{reason}</p>)}
      <h2>Map</h2>
      {/* Map embed link is found when you click on "Share" then "Embed a map" on Google Maps. */}
      <iframe src={info.mapEmbedLink} width="80%" height="500px" style={{border:0, margin:"auto auto 10px", display:"block"}} allowFullScreen="" loading="lazy" title="map"></iframe>
      <a href={info.googleMapsLink} target="_blank" rel="noopener noreferrer" className="button">
        <Button variant="contained">View on Google Maps</Button>
      </a>
    </div>
  );
};

export default LocationInfo;
