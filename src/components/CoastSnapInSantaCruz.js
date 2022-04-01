import React from "react";
import { Grid, Button } from "@mui/material";
import SantaCruz from "../images/CoastSnap In Santa Cruz/SantaCruz.svg";
import VulnerableCoastalCommunitiesandMarineEcosystems from "../images/CoastSnap In Santa Cruz/VulnerableCoastalCommunitiesandMarineEcosystems.svg";
import BringingCoastSnaptoSantaCruz from "../images/CoastSnap In Santa Cruz/BringingCoastSnaptoSantaCruz.svg";
import CitizenScienceEffortswithLastingImpact from "../images/CoastSnap In Santa Cruz/CitizenScienceEffortswithLastingImpact.svg";

// Section of homepage that explains why we want to bring CoastSnap to Santa Cruz.
// IMPORTANT: If you want to edit the text for an intro section, make sure to edit the text in TWO places!
const CoastSnapInSantaCruz = () => {
  return (
    <div>
      {/* FIRST PLACE:
        The text here is just a placeholder for the illustrations to be horizontally aligned with each section,
        so this text is invisible on the website.
        This is the only way I (Venus) knows how to make sticky positioning for the illustrations to align,
        but you are more than welcome to optimize this if you find a better way!
      */}
      <Grid container direction="row" sx={{position:"absolute"}}>
        <Grid className="stickySection introSection" container direction="row" justifyContent="space-between" alignItems="flex-start">
          <Grid item xs={12} md={5} className="placeholder">
            <h1>Santa Cruz</h1>
            <p>Widely known for its beautiful scenery, historic landmarks, and surf culture, Santa Cruz is one of the most popular tourist attractions in California.</p>
          </Grid>
          <Grid item xs={12} md={6} className="stickySection rightPadding">
            <img src={SantaCruz} alt="Santa Cruz Beach" className="introPic" />
          </Grid>
        </Grid>
        <Grid className="stickySection introSection" container direction="row" justifyContent="space-between" alignItems="flex-start">
          <Grid item xs={12} md={5} className="placeholder">
            <h1 className="darkBlueBackgroundHeading">Vulnerable Coastal Communities and Marine Ecosystems</h1>
            <p>According to an <a href="https://www.climate.gov/news-features/understanding-climate/climate-change-ocean-heat-content" target="_blank" rel="noopener noreferrer">article</a> from the National Oceanic and Atmospheric Administration (NOAA), <span className="blueText">climate change</span> is causing coastline changes, which could have dramatic and lasting consequences for coastal communities, such as more intense and more frequent storms, higher sea levels, and higher rates of erosion. Moreover, <span className="blueText">global warming</span> leads to ocean acidification, which could endanger marine life and other organisms living in the ocean.</p>
            <a href="https://arcg.is/18CKDv" target="_blank" rel="noopener noreferrer" className="button">
              <Button variant="contained">Learn More about Santa Cruz's Projected Coastal Vulnerabilities</Button>
            </a>
          </Grid>
          <Grid item xs={12} md={6} className="stickySection rightPadding">
            <img src={VulnerableCoastalCommunitiesandMarineEcosystems} alt="Rising Waves" className="introPic" />
          </Grid>
        </Grid>
        <Grid className="stickySection introSection" container direction="row" justifyContent="space-between" alignItems="flex-start">
          <Grid item xs={12} md={5} className="placeholder">
            <h1>Bringing CoastSnap to Santa Cruz</h1>
            <p>CoastSnap is a global citizen science project that aims to measure coastline change while engaging people on coastal issues and the impacts that climate change will have on local communities. It <span className="blueText">crowdsources images uploaded by the local community</span>, which is a cost-effective method for monitoring shoreline changes since anyone with a smartphone can contribute to data collection. Numerous CoastSnap stations have already been <span className="blueText">successfully implemented in different countries</span> such as Australia, France, the United Kingdom, Spain, and Canada.</p>
            <a href="https://www.coastsnap.com/" target="_blank" rel="noopener noreferrer" className="button">
              <Button variant="contained">Visit the Official CoastSnap Website</Button>
            </a>
            <p>Our mission is to <span className="blueText">assist in the development and implementation of CoastSnap</span> in the city of Santa Cruz in order to help monitor coastal change. We are extremely grateful to be collaborating with the United States Geological Survey (USGS), City of Santa Cruz, and many other supportive local organizations to bring CoastSnap to our local communities.</p>
          </Grid>
          <Grid item xs={12} md={6} className="stickySection rightPadding">
            <img src={BringingCoastSnaptoSantaCruz} alt="Device for Taking Photos of Coastline" className="introPic" />
          </Grid>
        </Grid>
        <Grid className="stickySection introSection" container direction="row" justifyContent="space-between" alignItems="flex-start">
          <Grid item xs={12} md={5} className="placeholder">
            <h1 className="darkBlueBackgroundHeading">Citizen Science Efforts with Lasting Impact</h1>
            <p>CoastSnap has the potential to <span className="blueText">increase public awareness</span> on various coastal processes from coastal erosion to sea-level changes in the long-term. Additionally, <span className="blueText">scientists will be better informed</span> about recent changes in the Pacific Coast as well as how climate change affects Santa Cruz's coastal behaviors. Collecting more of this data will help city officials <span className="blueText">make more effective decisions</span> when improving coastal management and climate adaptation plans.</p>
          </Grid>
          <Grid item xs={12} md={6} className="stickySection rightPadding">
            <img src={CitizenScienceEffortswithLastingImpact} alt="Scientific Data Trends, City's Climate Adaptation Plans, and the Citizens of Santa Cruz Participating in CoastSnap" className="introPic" />
          </Grid>
        </Grid>
      </Grid>
      {/* SECOND PLACE: The following text is actually displayed on the website.
        Instead, pictures in these sections are invisible and act as placeholders. 
      */}
      <Grid className="introSection" container direction="row" justifyContent="space-between" alignItems="flex-start">
        <Grid item xs={12} md={5}>
          <h1>Santa Cruz</h1>
          <p>Widely known for its beautiful scenery, historic landmarks, and surf culture, Santa Cruz is one of the most popular tourist attractions in California.</p>
        </Grid>
        <Grid item xs={12} md={6} className="placeholder rightPadding">
          <img src={SantaCruz} alt="Santa Cruz Beach" className="introPic" />
        </Grid>
      </Grid>
      <Grid className="introSection darkBlueBackground" container direction="row" justifyContent="space-between" alignItems="flex-start">
        <Grid item xs={12} md={5}>
          <h1 className="darkBlueBackgroundHeading">Vulnerable Coastal Communities and Marine Ecosystems</h1>
          <p>According to an <a href="https://www.climate.gov/news-features/understanding-climate/climate-change-ocean-heat-content" target="_blank" rel="noopener noreferrer">article</a> from the National Oceanic and Atmospheric Administration (NOAA), <span className="blueText">climate change</span> is causing coastline changes, which could have dramatic and lasting consequences for coastal communities, such as more intense and more frequent storms, higher sea levels, and higher rates of erosion. Moreover, <span className="blueText">global warming</span> leads to ocean acidification, which could endanger marine life and other organisms living in the ocean.</p>
          <a href="https://arcg.is/18CKDv" target="_blank" rel="noopener noreferrer" className="button">
            <Button variant="contained">Learn More about Santa Cruz's Projected Coastal Vulnerabilities</Button>
          </a>
        </Grid>
        <Grid item xs={12} md={6} className="placeholder rightPadding">
          <img src={VulnerableCoastalCommunitiesandMarineEcosystems} alt="Rising Waves" className="introPic" />
        </Grid>
      </Grid>
      <Grid className="introSection" container direction="row" justifyContent="space-between" alignItems="flex-start">
        <Grid item xs={12} md={5}>
          <h1>Bringing CoastSnap to Santa Cruz</h1>
          <p>CoastSnap is a global citizen science project that aims to measure coastline change while engaging people on coastal issues and the impacts that climate change will have on local communities. It <span className="blueText">crowdsources images uploaded by the local community</span>, which is a cost-effective method for monitoring shoreline changes since anyone with a smartphone can contribute to data collection. Numerous CoastSnap stations have already been <span className="blueText">successfully implemented in different countries</span> such as Australia, France, the United Kingdom, Spain, and Canada.</p>
          <a href="https://www.coastsnap.com/" target="_blank" rel="noopener noreferrer" className="button">
            <Button variant="contained">Visit the Official CoastSnap Website</Button>
          </a>
          <p>Our mission is to <span className="blueText">assist in the development and implementation of CoastSnap</span> in the city of Santa Cruz in order to help monitor coastal change. We are extremely grateful to be collaborating with the United States Geological Survey (USGS), City of Santa Cruz, and many other supportive local organizations to bring CoastSnap to our local communities.</p>
        </Grid>
        <Grid item xs={12} md={6} className="placeholder rightPadding">
          <img src={BringingCoastSnaptoSantaCruz} alt="Device for Taking Photos of Coastline" className="introPic" />
        </Grid>
      </Grid>
      <Grid className="introSection darkBlueBackground" container direction="row" justifyContent="space-between" alignItems="flex-start">
        <Grid item xs={12} md={5}>
          <h1 className="darkBlueBackgroundHeading">Citizen Science Efforts with Lasting Impact</h1>
          <p>CoastSnap has the potential to <span className="blueText">increase public awareness</span> on various coastal processes from coastal erosion to sea-level changes in the long-term. Additionally, <span className="blueText">scientists will be better informed</span> about recent changes in the Pacific Coast as well as how climate change affects Santa Cruz's coastal behaviors. Collecting more of this data will help city officials <span className="blueText">make more effective decisions</span> when improving coastal management and climate adaptation plans.</p>
        </Grid>
        <Grid item xs={12} md={6} className="placeholder rightPadding">
          <img src={CitizenScienceEffortswithLastingImpact} alt="Scientific Data Trends, City's Climate Adaptation Plans, and the Citizens of Santa Cruz Participating in CoastSnap" className="introPic" />
        </Grid>
      </Grid>
    </div>
  );
};

export default CoastSnapInSantaCruz;