import React, { useEffect } from "react";
import { Button, Grid, Box } from "@mui/material";
import Slideshow from "../components/Slideshow";
import { UploadButton } from "./Navbar";
import CoastSnapInSantaCruz from "./CoastSnapInSantaCruz";
import MethodsForUploadingPics from "./MethodsForUploadingPics";
import LocationCard from "../components/LocationCard";
const scLocationInfo = require("../data/locations.json");

const Home = (props) => {
  const { scrollElement, setScrollElement } = props;
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
      <div className="coastsnapCatchphrase">
        <h1 style={{marginBottom: 0}}>Capture Our Changing Coastlines</h1>
        <Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "center" }}>
          <UploadButton variant="contained" onClick={() => scrollTo(uploadRef)}>Get Involved</UploadButton>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, flexDirection: "column", justifyContent: "center" }}>
          <p><span className="blueText">CoastSnap</span> is a global citizen science project that aims to <span className="blueText">measure coastline change</span> while engaging people on coastal issues and impacts that climate change can have on local communities. Our mission is to assist in the development and implementation of <span className="blueText">CoastSnap in the city of Santa Cruz</span> to help monitor coastal change.</p>
          <Button variant="contained" onClick={() => scrollTo(aboutRef)} sx={{width: "fit-content", margin: "auto"}}>Learn More</Button>
        </Box>
      </div>
      <div ref={aboutRef}><CoastSnapInSantaCruz /></div>
      <div ref={uploadRef} className="defaultPadding">
        <h1>How You Can Support CoastSnap</h1>
        <p>The submission of coastline photographs by locals and tourists is crucial to create a large, diverse collection of data on Santa Cruz beaches. As long as you have a <span className="blueText">smartphone connected to WiFi or data</span>, you are ready to contribute! After taking a photo at one of the CoastSnap stations, <span className="blueText">upload your photo</span> through this website or the CoastSnap app. This collection of photographs will enable data collection on climate patterns in Santa Cruz coastlines and enable public interactions with climate issues from local citizens and passerby.</p>
        <p>To meet our main objective of bringing CoastSnap to Santa Cruz, we are first focusing on testing data collection with <span className="blueText">DIY (do it yourself) photo stations</span> along the Santa Cruz coastline. These photo stations will be replaced with camera mounts available for public usage in the future. The camera mounts will ensure consistent photographs from a variety of device models that CoastSnap will compile together as demonstrated in the timelapse videos for the photo stations below.</p>
        <MethodsForUploadingPics />
      </div>
      <div ref={locationsRef} className="darkBlueBackground defaultPadding">
        <h1 className="darkBlueBackgroundHeading">Santa Cruz Locations</h1>
        <p>Click on a location to view timelapses, directions, and more!</p>
        <Grid container spacing={4}>
          {/* For smaller viewports, the component fills all 12 available columns. For viewports with a width of 600 or more pixels, the component will fill up 4/12 columns. */}
          {scLocationInfo.map((loc) => <Grid item xs={12} md={4} key={loc.name}><LocationCard location={loc} /></Grid>)}
        </Grid>
      </div>
      <div className="defaultPadding">
        <h1>Team Members</h1>
        <p>The current UCSC team working on the project consists of Dr. Stella Hein and a variety of students with a passion for sustainability. These students come from all sorts of backgrounds and specialities that come together with Dr. Hein, to create a strong diverse team. The students include Venus Ku, Andy Surin, Litzia Galvan, Sarita Parikh, Iris Borius, Ella Thompson, and Emily Nguyen.</p>
        {/* <h1>Project Partners</h1>
        <p>We are extremely grateful to be collaborating with the United States Geological Survey (USGS), City of Santa Cruz, and many other supportive local organizations to bring CoastSnap to our local communities.</p> */}
      </div>
    </div>
  );
};
  
export default Home;
