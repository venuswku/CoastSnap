import React from "react";
import { Grid, Stack } from "@mui/material";
import NB1Lookout1 from "../images/Natural Bridges Site 1/NB1Pic1.jpg";
import NB1Lookout2 from "../images/Natural Bridges Site 1/NB1Pic2.jpg";
import NB1DangerSign1 from "../images/Natural Bridges Site 1/NB1Pic3.jpg";
import NB1DangerSign2 from "../images/Natural Bridges Site 1/NB1Pic4.jpg";
import NB1Railing1 from "../images/Natural Bridges Site 1/NB1Pic5.jpg";
import NB1Railing2 from "../images/Natural Bridges Site 1/NB1Pic6.jpg";
import NB2Pier from "../images/Natural Bridges Site 2/NB2Pic1.jpg";
import NB2PierCornerSpot from "../images/Natural Bridges Site 2/NB2Pic2.jpg";
import NB2Sharpie from "../images/Natural Bridges Site 2/NB2Pic3.jpg";
import NB2DevicePlacement from "../images/Natural Bridges Site 2/NB2Pic4.jpg";

const LocationDirections = (props) => {
  const { loc, enlarge } = props;

  // Enlarges the image when clicked.
  const handleClick = (event) => {
    enlarge(event.target.currentSrc, event.target.alt);
  };

  return (
    <div>
      {loc === "Natural Bridges Site 1" &&
        <div>
          <div className="flexColumnCenter marginBottom10">
            <p><span className="blueText">1.</span> Walk down the lookout point towards the ocean.</p>
            <Grid item xs={12} md={6}>
              <Stack direction={{ xs: "column", md: "row" }} justifyContent="center" alignItems="center" spacing={1}>
                <img src={NB1Lookout1} alt="Lookout Point 1" className="directionImage" onClick={handleClick}/>
                <img src={NB1Lookout2} alt="Lookout Point 2" className="directionImage" onClick={handleClick}/>
              </Stack>
            </Grid>
          </div>
          <div className="flexColumnCenter marginBottom10">
            <p><span className="blueText">2.</span> Approach the following Danger sign.</p>
            <Grid item xs={12} md={6}>
              <Stack direction={{ xs: "column", md: "row" }} justifyContent="center" alignItems="center" spacing={1}>
                <img src={NB1DangerSign1} alt="Danger Sign 1" className="directionImage" onClick={handleClick}/>
                <img src={NB1DangerSign2} alt="Danger Sign 2" className="directionImage" onClick={handleClick}/>
              </Stack>
            </Grid>
          </div>
          <div className="flexColumnCenter marginBottom10">
            <p><span className="blueText">3.</span> Find the subtle Sharpie markings over the sign (should be in the shape of a rectangle).</p>
            <p>{"Notice the X mark over the nail, that's the side your device's camera should be facing!"}</p>
            <Grid item xs={12} md={6} className="centerText">
              <img src={NB1Railing1} alt="Railing 1" className="directionImage" onClick={handleClick}/>
            </Grid>
          </div>
          <div className="flexColumnCenter marginBottom10">
            <p><span className="blueText">4.</span> Then place your device on the railing, line up the top of your device with the railing crack and face the camera towards the beach like the following.</p>
            <Grid item xs={12} md={6} className="centerText">
              <img src={NB1Railing2} alt="Railing 2" className="directionImage" onClick={handleClick}/>
            </Grid>
          </div>
        </div>
      }
      {loc === "Natural Bridges Site 2" &&
        <div>
          <div className="flexColumnCenter marginBottom10">
            <p><span className="blueText">1.</span> Head towards the pier as shown.</p>
            <Grid item xs={12} md={6} className="centerText">
              <img src={NB2Pier} alt="Pier" className="directionImage" onClick={handleClick}/>
            </Grid>
          </div>
          <div className="flexColumnCenter marginBottom10">
            <p><span className="blueText">2.</span> Walk up to the left corner, as shown by our handy assistant.</p>
            <Grid item xs={12} md={6} className="centerText">
              <img src={NB2PierCornerSpot} alt="Pier Corner Spot" className="directionImage" onClick={handleClick}/>
            </Grid>
          </div>
          <div className="flexColumnCenter marginBottom10">
            <p><span className="blueText">3.</span> Find the subtle Sharpie markings. The X displayed is the side your camera should be facing.</p>
            <Grid item xs={12} md={6} className="centerText">
              <img src={NB2Sharpie} alt="Sharpie Markings" className="directionImage" onClick={handleClick}/>
            </Grid>
          </div>
          <div className="flexColumnCenter marginBottom10">
            <p><span className="blueText">4.</span> Place your device as displayed and take your shot.</p>
            <Grid item xs={12} md={6} className="centerText">
              <img src={NB2DevicePlacement} alt="Device Placement" className="directionImage" onClick={handleClick}/>
            </Grid>
          </div>
        </div>
      }
    </div>
  );
};

export default LocationDirections;