import React, { useEffect, useContext } from "react";
import { WebsiteContext } from "../App";
import { Link } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import Slideshow from "../components/Slideshow";
import { UploadButton } from "../components/Navbar";
import CoastSnapFeatures from "../components/CoastSnapFeatures";
import AboutCoastSnap from "../images/Homepage/AboutCoastSnap.jpg";
import MethodsForUploadingPics from "../components/MethodsForUploadingPics";
import LocationCard from "../components/LocationCard";
import TeamMembers from "../components/TeamMembers";
const scLocationInfo = require("../data/locations.json");

const Home = () => {
  const { mobile, tablet, scrollElement, setScrollElement } = useContext(WebsiteContext);
  const aboutRef = React.useRef(null);
  const uploadRef = React.useRef(null);
  const locationsRef = React.useRef(null);

  // Scrolls to a certain element in the website.
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  // After the Home component mounts, it scrolls to an element if specified.
  useEffect(() => {
    switch (scrollElement) {
      case "about":
        scrollTo(aboutRef);
        break;
      case "upload":
        scrollTo(uploadRef);
        break;
      case "locations":
        scrollTo(locationsRef);
        break;
      default:
        break;
    }
    setScrollElement("");
  }, [scrollElement, setScrollElement]);

  return (
    <div>
      <Slideshow />
      <div className="coastsnapCatchphrase" style={tablet ? {width:"70%"}: {width:"50%"}}>
        <h1 className="catchphraseHeading">Capture Our Changing Coastlines</h1>
        <div className="flexColumnCenter">
          {tablet ?
            <p>Join us on our mission to <span className="blueText">bring CoastSnap</span>, a global citizen science project aiming to <span className="blueText">monitor coastline change</span>, to the city of <span className="blueText">Santa Cruz</span>.</p> :
            <p><span className="blueText">CoastSnap</span> is a global citizen science project aiming to <span className="blueText">monitor coastline change</span> while engaging people on coastal issues and the impacts of climate change. Our mission is to assist in the development and implementation of <span className="blueText">CoastSnap in the city of Santa Cruz</span>.</p>
          }
          <UploadButton variant="contained" onClick={() => scrollTo(uploadRef)} sx={{width: "fit-content", margin: "auto"}}>Get Involved</UploadButton>
        </div>
      </div>
      
      <CoastSnapFeatures />

      <div ref={aboutRef} className="relativePosition whiteText">
        {!mobile && <img src={AboutCoastSnap} alt="Phone Cradle Facing Coastline" className="fullWidth" />}
        <Grid item xs={12} md={6}
          className={mobile ? "defaultPadding aboutImgBackground" : (tablet ? "defaultPadding middleRight rightAlignedText" : "defaultRightPadding middleRight")}
        >
          <h1>Bringing CoastSnap to Santa Cruz</h1>
          <p className="aboutText">There are hundreds of CoastSnap stations around the world, but none have been deployed on the West Coast of the United States. We hope to integrate this hands-on way with the Santa Cruz community to collectively manage the inevitable future of accelerated coastal change.</p>
          <Link to="/about" className="button">
            <Button variant="contained">Learn More</Button>
          </Link>
        </Grid>
      </div>

      <div ref={locationsRef} className="defaultPadding">
        <h1>Santa Cruz Locations</h1>
        <p className="grayText italic">Click on a location to view timelapses, directions and more!</p>
        <p>To meet our main objective of bringing CoastSnap to Santa Cruz, we are first focusing on testing data collection with <span className="blueText">DIY (do it yourself) photo stations</span> along the Santa Cruz coastline. Thanks to the guidance of John Warrick from the United States Geological Survey (USGS), we were able to find some decent sites for data collection. Currently, the photo stations are marked with Sharpie on the railings to ensure minimal disturbance to the areas while creating accurate reference points for our team to take identical photographs thoughout our testing period. These sites will eventually be replaced with camera mounts available for public usage, which will ensure consistent photographs from a variety of device models that CoastSnap will compile together as demonstrated in the timelapse videos for the photo stations below.</p>
        <Grid container spacing={4}>
          {/* For smaller viewports, the component fills all 12 available columns. For viewports with a width of 600 or more pixels, the component will fill up 4/12 columns. */}
          {scLocationInfo.map((loc) => <Grid item xs={12} sm={6} md={4} key={loc.name}><LocationCard location={loc} /></Grid>)}
        </Grid>
      </div>
      
      <div ref={uploadRef}>
        <MethodsForUploadingPics />
      </div>
      
      <div className="defaultPadding">
        <h1>UC Santa Cruz Team</h1>
        <p>The current UCSC team working on this project consists of Dr. Stella Hein and a variety of students with a passion for ocean sustainability. These students are involved with the UCSC sustainability program <i>Impact Designs: Engineering and Sustainability through Student Service</i> (IDEASS) and come from all sorts of backgrounds and specialities to create a strong, diverse team. They include Alfonso De Eguia Gutierrez, Andy Surin, Ella Thompson, Emily Nguyen, Iris Borius, Litzia Galvan, Sarita Parikh and Venus Ku.</p>
        <TeamMembers />
        {/* <h1>Project Partners</h1>
        <p>We are extremely grateful to be collaborating with the United States Geological Survey (USGS), City of Santa Cruz and many other supportive local organizations to bring CoastSnap to our local communities.</p> */}
      </div>
    </div>
  );
};
  
export default Home;
