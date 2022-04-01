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
  const uploadMethodsRef = React.useRef(null);
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
      case "uploadMethods":
        scrollTo(uploadMethodsRef);
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
        Capture Changing Coastlines
        <Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "center" }}>
          <UploadButton variant="contained" onClick={() => scrollTo(uploadMethodsRef)}>Get Involved</UploadButton>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
          <Button variant="contained" onClick={() => scrollTo(aboutRef)}>Learn More</Button>
        </Box>
      </div>
      <div ref={aboutRef}><CoastSnapInSantaCruz /></div>
      <div className="defaultPadding">
        <h1>How CoastSnap Works</h1>
        <p>CoastSnap provides a low-cost method for mapping shoreline changes by using images that are uploaded from community members to our website or the CoastSnap app. Our main objective is to assist in the development and implementation of a CoastSnap citizen science effort to monitor coastal change in the city of Santa Cruz. To meet this objective, we will first focus on testing data collection with a "DIY" photo station along the Santa Cruz coastline which will be replaced with a camera mount available for public usage. The submission of photographs by passersby is crucial to create a large, diverse collection of data on Santa Cruz beaches. The mounts will ensure consistent photographs from a variety of device models that CoastSnaps will compile together as demonstrated in the timelapse videos for the photo stations below. This collection of photographs will enable data collection on climate patterns in Santa Cruz coastlines, and enable public interactions with climate issues from local citizens and passerby.</p>
        <div ref={uploadMethodsRef}><MethodsForUploadingPics /></div>
      </div>
      <div ref={locationsRef} className="darkBlueBackground defaultPadding">
        <h1 className="darkBlueBackgroundHeading">Santa Cruz Locations</h1>
        <p>Click on a location to learn more!</p>
        <Grid container spacing={4}>
          {/* For smaller viewports, the component fills all 12 available columns. For viewports with a width of 600 or more pixels, the component will fill up 4/12 columns. */}
          {scLocationInfo.map((loc) => <Grid item xs={12} md={4} key={loc.name}><LocationCard location={loc} /></Grid>)}
        </Grid>
      </div>
      <div className="defaultPadding">
        <h1>Team Members</h1>
        <p>The current UCSC team working on the project consists of Dr. Stella Hein and a variety of students with a passion for sustainability. These students come from all sorts of backgrounds and specialities that come together with Dr. Hein, to create a strong diverse team. The students include Venus Ku, Andy Surin, Litzia Galvan, Sarita Parikh, Iris Borius, Ella Thompson and Emily Nguyen.</p>
        {/* <h1>Project Partners</h1> */}
      </div>
    </div>
  );
};
  
export default Home;
