import React, { useContext } from "react";
import { WebsiteContext } from "../App";
import HeaderBackground from "../images/About/SantaCruzLighthouse.jpg";
import CoastSnapInSantaCruz from "../components/CoastSnapInSantaCruz";
import MethodsForUploadingPics from "../components/MethodsForUploadingPics";

const About = () => {
  const { tablet } = useContext(WebsiteContext);

  return (
    <div id="about">
      <div className="relativePosition">
        <img src={HeaderBackground} alt="Santa Cruz Breakwater (Walton) Lighthouse" className="fullWidth" />
        <div className={(tablet ? "centerText" : "middleLeft") + " defaultLeftPadding defaultRightPadding fullWidth"}>
          <h1>About CoastSnap in Santa Cruz</h1>
          <p style={tablet ? {width: "100%"} : {width: "50%"}}>CoastSnap provides an informative and low-cost way to monitor and encourage interest in learning about coastal change.</p>
        </div>
      </div>
      <CoastSnapInSantaCruz />
      <MethodsForUploadingPics />
    </div>
  );
};

export default About;