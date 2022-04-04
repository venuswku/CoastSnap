import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme, useMediaQuery, Button, Grid } from "@mui/material";
import { UploadButton } from "./Navbar";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import LocationDirections from "./LocationDirections";
import EnlargeImagePopup from "./EnlargeImagePopup";

const scLocationInfo = require("../data/locations.json");

const LocationInfo = () => {
  const { location } = useParams();
  const info = scLocationInfo.filter(loc => loc.name === location)[0];
  const image = require(`../images/${location}/${info.image}`);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const [enlargedImg, setEnlargedImg] = React.useState(null);
  const [enlargedImgDescription, setEnlargedImgDescription] = React.useState(null);
  
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  // Opens popup that displays the enlarged image.
  const handleEnlarge = (img, desc) => {
    setEnlargedImg(img);
    setEnlargedImgDescription(desc)
  };
  // Closes popup that displays the enlarged image.
  const handleClose = () => {
    setEnlargedImg(null);
    setEnlargedImgDescription(null);
  };

  return (
    <div className="centeredContent">
      <h1>{location}</h1>
      <img className="locationImage" src={image} alt={location} width={mobile ? "100%" : "40%"} onClick={() => handleEnlarge(image, location)} />
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
          <Grid item xs={12} md={8} sx={{margin:"auto"}}>
            <iframe src={info.mapEmbedLink} width="100%" height="500px" style={{border:0, marginBottom:"10px"}} allowFullScreen="" loading="lazy" title="map"></iframe>
          </Grid>
          {info.googleMapsLink &&
            <a href={info.googleMapsLink} target="_blank" rel="noopener noreferrer" className="button">
              <Button variant="contained" endIcon={<MapRoundedIcon />}>View in Google Maps</Button>
            </a>
          }
        </div>
      }
      <h2>Directions</h2>
      <LocationDirections loc={location} enlarge={handleEnlarge} />
      <Button variant="contained" onClick={() => handleEnlarge(image, location + " Example Image")}>See Example Image</Button>
      {/* Popup for displaying enlarged images. */}
      {enlargedImg && <EnlargeImagePopup img={enlargedImg} description={enlargedImgDescription} close={handleClose} />}
    </div>
  );
};

export default LocationInfo;
