import React from "react";
import { Stack } from "@mui/material";
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
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="center" alignItems="center" spacing={2}>
            <img src={NB1Lookout1} alt="Lookout Point 1" className="directionImage" onClick={handleClick}/>
            <img src={NB1Lookout2} alt="Lookout Point 2" className="directionImage" onClick={handleClick}/>
          </Stack>
          <p>1. Walk down the lookout point towards the ocean until you see the Danger sign below.</p>
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="center" alignItems="center" spacing={2}>
            <img src={NB1DangerSign1} alt="Danger Sign 1" className="directionImage" onClick={handleClick}/>
            <img src={NB1DangerSign2} alt="Danger Sign 2" className="directionImage" onClick={handleClick}/>
          </Stack>
          <p>2. Find the subtle Sharpie markings over the sign (should be in the shape of a rectangle).</p>
          <p>{"Notice the X mark over the nail, that's the side your device's camera should be facing!"}</p>
          <img src={NB1Railing1} alt="Railing 1" className="directionImage" onClick={handleClick}/>
          <p>3. Then place your device on the railing, line up the top of your device with the railing crack, and face the camera towards the beach like the following.</p>
          <img src={NB1Railing2} alt="Railing 2" className="directionImage" onClick={handleClick}/>
        </div>
      }
      {loc === "Natural Bridges Site 2" &&
        <div>
          <p>1. Head towards the pier displayed below.</p>
          <img src={NB2Pier} alt="Pier" className="directionImage" onClick={handleClick}/>
          <p>2. Walk up to the left corner, as shown by our handy assistant.</p>
          <img src={NB2PierCornerSpot} alt="Pier Corner Spot" className="directionImage" onClick={handleClick}/>
          <p>3. Find the subtle Sharpie markings. The X displayed is the side your camera should be facing.</p>
          <img src={NB2Sharpie} alt="Sharpie Markings" className="directionImage" onClick={handleClick}/>
          <p>4. Place your device as displayed and take your shot.</p>
          <img src={NB2DevicePlacement} alt="Device Placement" className="directionImage" onClick={handleClick}/>
        </div>
      }
    </div>
  );
};

export default LocationDirections;