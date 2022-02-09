import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { Stack } from "@mui/material";
import { UploadButton } from "./Navbar";
// Using Google Maps API: https://developers.google.com/maps/documentation/javascript/adding-a-google-map#maps_add_map-javascript

const LocationInfo = (props) => {
  const { location } = useParams();
  const { scLocations } = props;
  let info = scLocations.filter(loc => loc.name === location)[0];

  const initMap = () => {
    const coordinates = { lat: info.latitude, lng: info.longitude };
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: coordinates,
      zoom: 16,
    });
    new window.google.maps.Marker({
      position: coordinates,
      map: map,
    });
  };

  useEffect(() => {
    window.scrollTo(0,0);
    // Browser renders page while the API loads & executes initMap() once the Google Maps API finishes loading.
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
    script.async = true;
    script.onload = initMap;
    document.body.appendChild(script);
  }, []);

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
      <h2>Map</h2>
      <div id="map"></div>
    </div>
  );
};

export default LocationInfo;
