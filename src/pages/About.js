import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import HeaderBackground from "../images/About/SantaCruzLighthouse.jpg";
import CoastSnapInSantaCruz from "../components/CoastSnapInSantaCruz";
import MethodsForUploadingPics from "../components/MethodsForUploadingPics";

const About = () => {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <div className="relativePosition">
        <img src={HeaderBackground} alt="Santa Cruz Breakwater (Walton) Lighthouse" className="fullWidth" />
        {!tablet && <h1 className="middleLeft defaultLeftPadding defaultRightPadding">About CoastSnap in Santa Cruz</h1>}
      </div>
      {tablet && <h1 className="centerText defaultLeftPadding defaultRightPadding">About CoastSnap in Santa Cruz</h1>}
      <CoastSnapInSantaCruz />
      <MethodsForUploadingPics />
    </div>
  );
};

export default About;