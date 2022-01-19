import React, { useEffect } from "react";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import BackgroundImg from "../images/NaturalBridgesSite1_Dec.04.2021_11_39_iphone7.jpeg";

const Home = (props) => {
  const { scrollElement } = props;
  const aboutRef = React.useRef(null);
  const locationsRef = React.useRef(null);

  // Scrolls to a certain element in the website.
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
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
  }, [scrollElement]);

  return (
    <div>
      <img className="backgroundImage" src={BackgroundImg} alt={"Natural Bridges Site 1"}/>
      <div className="leftAlignedContent">
        <p>global citizen science project to capture our changing coastlines</p>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Link to="/upload" className="button">
            <Button variant="contained">Upload Your Photo</Button>
          </Link>
          <a href="https://play.google.com/store/apps/details?id=com.spotteron.coastsnap" target="_blank" rel="noopener noreferrer" className="button">
            <Button variant="contained">Google Play</Button>
          </a>
          <a href="https://apps.apple.com/us/app/coastsnap-spotteron/id1529921850" target="_blank" rel="noopener noreferrer" className="button">
            <Button variant="contained">App Store</Button>
          </a>
        </Stack>
        <h1 ref={aboutRef}>About CoastSnap</h1>
        <p>CoastSnap is a project that provides a low-cost method for mapping shoreline changes by crowdsourcing images that are uploaded from community members to social media. Numerous CoastSnap stations have already been successfully implemented in different countries such as Australia, France, the United Kingdom, Spain and Canada. Our project aims to engage people on coastal issues and the impacts that climate change will have on local communities throughout Santa Cruz in the United States. We currently are partnering with the United States Geological Survey (USGS), the City of Santa Cruz, and many other supportive local organizations to bring CoastSnap to Santa Cruz. Growing interest and participation in CoastSnap from the general public will allow an increased amount of public awareness on sustainable issues, as well as a larger set of data collection for concise and accurate information about rising sea levels.</p>
        <Button variant="contained">
          <a href="https://www.coastsnap.com/" target="_blank" rel="noopener noreferrer" className="button">Visit the CoastSnap Website</a>
        </Button>
        <h1 ref={locationsRef}>Santa Cruz Locations</h1>
        <p>Natural Bridges Site 1</p>
        <p>Natural Bridges Site 2</p>
      </div>
    </div>
  );
};
  
export default Home;
