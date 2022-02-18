import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { Stack, Button } from "@mui/material";
import { UploadButton } from "./Navbar";

const scLocationInfo = require("../data/locations.json");

const LocationInfo = () => {
  const { location } = useParams();
  const info = scLocationInfo.filter(loc => loc.name === location)[0];
  
  useEffect(() => {
    window.scrollTo(0,0);
    // Load map for location using Leaflet and Mapbox: https://leafletjs.com/examples/quick-start/
    const map = window.L.map("map").setView([info.latitude, info.longitude], 17);
    window.L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
      maxZoom: 23,
      id: "mapbox/satellite-streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    }).addTo(map);
    window.L.marker([info.latitude, info.longitude]).addTo(map);
  }, [info]);

  return (
    <div className="centeredContent">
      <h1>{location}</h1>
      <h2>Description</h2>
      <p>{info.description}</p>
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
      <ul>
        {info.reasonsForChosingLocation.map((reason, i) => <li key={i}>{reason}</li>)}
      </ul>
      <h2>Map</h2>
      <div id="map"></div>
      <iframe src={info.mapEmbedLink} width="100%" height="500px" style={{border:0, marginBottom:"10px"}} allowFullScreen="" loading="lazy" title="map"></iframe>
      <a href={info.googleMapsLink} target="_blank" rel="noopener noreferrer" className="button">
        <Button variant="contained">View on Google Maps</Button>
      </a>
    </div>
  );
};

export default LocationInfo;
