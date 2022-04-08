import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme, useMediaQuery, Button, Grid } from "@mui/material";
import { UploadButton } from "../components/Navbar";
import Wave from "../images/Location Info/Wave.svg";
import TransparentWave from "../images/Location Info/TransparentWave.svg";
import FlipFlops from "../images/Location Info/FlipFlops.svg";
import Lifebuoy from "../images/Location Info/Lifebuoy.svg";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import LocationDirections from "../components/LocationDirections";
import EnlargeImagePopup from "../components/EnlargeImagePopup";

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
    <div className="locationBackground topLeft">
      <img className="wave topLeft" src={TransparentWave} alt="Transparent Wave" />
      <img className="wave topLeft" src={Wave} alt="Wave" />
      <div className="locationContent">
        <div className="flexColumnCenter">
          <img className="locationImage" src={image} alt={location} width={mobile ? "100%" : "55%"} onClick={() => handleEnlarge(image, location)} />
          <h1 className="noBottomMargin" style={{marginTop:0}}>{location}</h1>
          <p className="grayText">{info.description}</p>
          <Link to={"/upload?location=" + location} className="button">
            <UploadButton variant="contained">Upload Photo</UploadButton>
          </Link>
        </div>
        <h2 className="noBottomMargin">Timelapses</h2>
        <p className="grayText">The following videos have been compiled from the photos that our team has collected over several months.</p>
        <div className="timelapseVideos">
          {info.timelapseVids.map((vid, i) =>
            <Grid item xs={12} md={7} key={vid}>
              <div className="timelapseContainer">
                <iframe src={vid} title={"Timelapse Video " + (i+1)} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </Grid>
          )}
          <img className="flipFlops" src={FlipFlops} alt="Flip Flops" />
        </div>
        {/* Map embed link is found when you click on "Share" then "Embed a map" on Google Maps. */}
        {info.mapEmbedLink &&
          <div className="mapContentWrapper">
            <h2 className="noBottomMargin">Map</h2>
            <p className="grayText">To find the exact location of this photo station, use the following map or directly view it in Google Maps.</p>
            <div className="flexColumnCenter">
              <div className="mapWrapper">
                <Grid item xs={12} md={8}>
                  <iframe src={info.mapEmbedLink} className="map" allowFullScreen="" loading="lazy" title="map"></iframe>
                </Grid>
              </div>
              {info.googleMapsLink &&
                <a href={info.googleMapsLink} target="_blank" rel="noopener noreferrer" className="button">
                  <Button variant="contained" endIcon={<MapRoundedIcon />}>View in Google Maps</Button>
                </a>
              }
            </div>
            <img className="lifebuoy" src={Lifebuoy} alt="Lifebuoy" />
          </div>
        }
        <h2 className="noBottomMargin">Directions</h2>
        <p className="grayText">Click on an image to enlarge it.</p>
        <LocationDirections loc={location} enlarge={handleEnlarge} />
        <div className="centerText"><Button variant="contained" onClick={() => handleEnlarge(image, location + " Example Image")}>See Example Image</Button></div>
        {/* Popup for displaying enlarged images. */}
        {enlargedImg && <EnlargeImagePopup img={enlargedImg} description={enlargedImgDescription} close={handleClose} />}
      </div>
    </div>
  );
};

export default LocationInfo;
