import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { UploadButton } from "./Navbar";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import LocationDirections from "./LocationDirections";

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
      <div className="timelapseVideos">
        {info.timelapseVids.map((vid, i) =>
          <Grid item xs={12} md={6} key={vid}>
            <div className="timelapseContainer">
              <iframe src={vid} title={"Timelapse Video " + (i+1)} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </Grid>
        )}
      </div>
      <h2>Reasons for Chosing This Location</h2>
      {info.reasonsForChosingLocation.map((reason, i) => <p key={i}>{reason}</p>)}
      {/* Map embed link is found when you click on "Share" then "Embed a map" on Google Maps. */}
      {info.mapEmbedLink &&
        <div>
          <h2>Map</h2>
          <iframe src={info.mapEmbedLink} width="80%" height="500px" style={{border:0, margin:"auto auto 10px", display:"block"}} allowFullScreen="" loading="lazy" title="map"></iframe>
          {info.googleMapsLink &&
            <a href={info.googleMapsLink} target="_blank" rel="noopener noreferrer" className="button">
              <Button variant="contained" endIcon={<MapRoundedIcon />}>View on Google Maps</Button>
            </a>
          }
        </div>
      }
      <h2>Directions</h2>
      <LocationDirections loc={location} />
    </div>
  );
};

export default LocationInfo;
