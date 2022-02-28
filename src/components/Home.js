import React, { useEffect } from "react";
import { Button, Grid } from "@mui/material";
// import BackgroundImg from "../images/NaturalBridgesSite1_Dec.04.2021_11_39_iphone7.jpeg";
import Slideshow from "../components/Slideshow";
import MethodsForUploadingPics from "./MethodsForUploadingPics";
import LocationCard from "../components/LocationCard";
const scLocationInfo = require("../data/locations.json");

const Home = (props) => {
  const { scrollElement, setScrollElement } = props;
  const aboutRef = React.useRef(null);
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
      {/* <img className="backgroundImage" src={BackgroundImg} alt={"Natural Bridges Site 1"}/> */}
      <div className="leftAlignedContent">
        <h1 ref={aboutRef}>About CoastSnap</h1>
        <p>CoastSnap is a project that aims to measure coastline-change while engaging people on coastal issues and the impacts that climate change will have on local communities throughout Santa Cruz, California by providing crowdsourcing images, a low-cost method for mapping shoreline changes, that will be uploaded from community members to the CoastSnap app. We currently are partnering with the United States Geological Survey, the City of Santa Cruz, and other supportive local organizations to bring CoastSnap to the coastline of Santa Cruz. The photos taken on the camera mounts will directly generate data of the Santa Cruz coastline, which will display how climate change and climate impacts affect Santa Cruz coastal behaviors.</p>
        <a href="https://www.coastsnap.com/" target="_blank" rel="noopener noreferrer" className="button">
          <Button variant="contained">Visit the CoastSnap Website</Button>
        </a>
        <h1>How CoastSnap Works</h1>
        <p>CoastSnap provides a low-cost method for mapping shoreline changes by using images that are uploaded from community members to our website. Our main objective is to assist in the development and implementation of a CoastSnap citizen science effort to monitor coastal change in the city of Santa Cruz. To meet this objective, we will first focus on testing data collection with a "DIY" photo station along the Santa Cruz coastline which will be replaced with a camera mount available for public usage. The submission of photographs by passersby is crucial to create a large, diverse collection of data on Santa Cruz beaches. The mounts will ensure consistent photographs from a variety of device models that CoastSnaps will compile together as demonstrated in the video reels below. This collection of photographs will enable data collection on climate patterns in Santa Cruz coastlines, and enable public interactions with climate issues from local citizens and passerby.</p>
        <MethodsForUploadingPics />
        <h1 ref={locationsRef}>Santa Cruz Locations</h1>
        <Grid container spacing={4}>
          {/* For smaller viewports, the component fills all 12 available columns. For viewports with a width of 600 or more pixels, the component will fill up 4/12 columns. */}
          {scLocationInfo.map((loc) => <Grid item xs={12} md={4} key={loc.name}><LocationCard location={loc} /></Grid>)}
        </Grid>
        <h1>Team Members</h1>
        <p>The current UCSC team working on the project consists of a variety of students with a passion for sustainability and Dr. Stella Hein. These students come from all sorts of backgrounds and specialities that come together with Dr. Hein, to create a strong diverse team. The students include Venus Ku, Andy Surin, Litzia Galvan, Sarita Parikh, Iris Borius, Ella Thompson and Emily Nguyen.</p>
        <h1>Special Thanks To</h1>
      </div>
    </div>
  );
};
  
export default Home;
