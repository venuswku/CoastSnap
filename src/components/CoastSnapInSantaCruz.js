import React from "react";
import { useTheme, useMediaQuery, Box, Grid, Button } from "@mui/material";
import SantaCruz from "../images/CoastSnap In Santa Cruz/SantaCruz.svg";
import VulnerableCoastalCommunitiesandMarineEcosystems from "../images/CoastSnap In Santa Cruz/VulnerableCoastalCommunitiesandMarineEcosystems.svg";
import BringingCoastSnaptoSantaCruz from "../images/CoastSnap In Santa Cruz/BringingCoastSnaptoSantaCruz.svg";
import CitizenScienceEffortswithLastingImpact from "../images/CoastSnap In Santa Cruz/CitizenScienceEffortswithLastingImpact.svg";
import MobileFirstSection from "../images/CoastSnap In Santa Cruz/Mobile_FirstSection.svg";
import MobileSecondSection from "../images/CoastSnap In Santa Cruz/Mobile_SecondSection.svg";
import MobileThirdSection from "../images/CoastSnap In Santa Cruz/Mobile_ThirdSection.svg";
import MobileFourthSection from "../images/CoastSnap In Santa Cruz/Mobile_FourthSection.svg";

// Section of homepage that explains why we want to bring CoastSnap to Santa Cruz.
// IMPORTANT: If you want to edit the text for an intro section, make sure to edit the text in TWO places!
const CoastSnapInSantaCruz = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      {/* FIRST PLACE:
        The text here is just a placeholder for the illustrations to be horizontally aligned with each section,
        so this text is invisible on the website.
        This is the only way I (Venus) knows how to make sticky positioning for the illustrations to align,
        but you are more than welcome to optimize this if you find a better way!
      */}
      <Box className="introSectionsWrapper" sx={{ position: "absolute", display: { xs: "none", md: "grid" } }}>
        <div className="stickySection introSection">
          <Grid item md={6} className="placeholder">
            <h1>Santa Cruz</h1>
            <p>Widely known for its beautiful scenery, historic landmarks, and surf culture, Santa Cruz is <span className="blueText">one of the most popular tourist attractions</span> in California. Some well-known places include the Santa Cruz Beach Boardwalk, West Cliff Drive, and the Santa Cruz Wharf.</p>
          </Grid>
          <Grid item md={6} className="rightPadding">
            <img src={SantaCruz} alt="Santa Cruz Beach" className="introPic" />
          </Grid>
        </div>
        <div className="stickySection introSection">
          <Grid item md={6} className="placeholder">
            <h1 className="darkBlueBackgroundHeading">Vulnerable Coastal Communities and Marine Ecosystems</h1>
            <p>According to an <a href="https://www.climate.gov/news-features/understanding-climate/climate-change-ocean-heat-content" target="_blank" rel="noopener noreferrer">article</a> from the National Oceanic and Atmospheric Administration (NOAA), <span className="blueText">climate change</span> is causing coastline changes, which could have dramatic and lasting consequences for coastal communities, such as more intense and more frequent storms, higher sea levels, and higher rates of erosion. Moreover, <span className="blueText">global warming</span> leads to ocean acidification, which could endanger marine life and other organisms living in the ocean.</p>
            <a href="https://arcg.is/18CKDv" target="_blank" rel="noopener noreferrer" className="button">
              <Button variant="contained">Learn More about Santa Cruz's Projected Coastal Vulnerabilities</Button>
            </a>
          </Grid>
          <Grid item md={6} className="rightPadding">
            <img src={VulnerableCoastalCommunitiesandMarineEcosystems} alt="Rising Waves" className="introPic" />
          </Grid>
        </div>
        <div className="stickySection introSection">
          <Grid item md={6} className="placeholder">
            <h1>Bringing CoastSnap to Santa Cruz</h1>
            <p>CoastSnap is a global project with the goal of monitoring coastline change through community participation in data collection. It <span className="blueText">crowdsources images uploaded by the local community</span>, which is a cost-effective method for monitoring shoreline changes since anyone with a smartphone can contribute. Numerous CoastSnap stations have already been <span className="blueText">successfully implemented in different countries</span> such as Australia, France, the United Kingdom, Spain, and Canada. Along with our project partners, we hope to assist in the development and implementation of CoastSnap in Santa Cruz.</p>
            <a href="https://www.coastsnap.com/" target="_blank" rel="noopener noreferrer" className="button">
              <Button variant="contained">Visit the Official CoastSnap Website</Button>
            </a>
          </Grid>
          <Grid item md={6} className="rightPadding">
            <img src={BringingCoastSnaptoSantaCruz} alt="Device for Taking Photos of Coastline" className="introPic" />
          </Grid>
        </div>
        <div className="stickySection introSection">
          <Grid item md={5} className="placeholder">
            <h1 className="darkBlueBackgroundHeading">Citizen Science Efforts with Lasting Impact</h1>
            <p>CoastSnap has the potential to <span className="blueText">increase public awareness</span> on various coastal processes from coastal erosion to sea-level changes in the long-term. Additionally, <span className="blueText">scientists will be better informed</span> about recent changes in the Pacific Coast as well as how climate change affects Santa Cruz's coastal behaviors. Collecting more of this data will help city officials <span className="blueText">make more effective decisions</span> when improving coastal management and climate adaptation plans.</p>
          </Grid>
          <Grid item md={6} className="rightPadding">
            <img src={CitizenScienceEffortswithLastingImpact} alt="Scientific Data Trends, City's Climate Adaptation Plans, and the Citizens of Santa Cruz Participating in CoastSnap" className="introPic" />
          </Grid>
        </div>
      </Box>
      {/* SECOND PLACE: The following text is actually displayed on the website.
        Instead, pictures in these sections are invisible and act as placeholders. 
      */}
      <Box className="introSectionsWrapper" sx={{ display: { xs: "flex", md: "grid" } }}>
        <div className={mobile ? "mobileIntroSection" : "introSection"}>
          {mobile && <img src={MobileFirstSection} alt="Santa Cruz Beach" className="introPic" />}
          <Grid item xs={12} md={6}>
            <h1>Santa Cruz</h1>
            <p>Widely known for its beautiful scenery, historic landmarks, and surf culture, Santa Cruz is <span className="blueText">one of the most popular tourist attractions</span> in California. Some well-known places include the Santa Cruz Beach Boardwalk, West Cliff Drive, and the Santa Cruz Wharf.</p>
          </Grid>
          {!mobile &&
            <Grid item md={6} className="placeholder rightPadding">
              <img src={SantaCruz} alt="Santa Cruz Beach" className="introPic" />
            </Grid>
          }
        </div>
        <div className={"darkBlueBackground " + (mobile ? "mobileIntroSection" : "introSection")}>
          {mobile && <img src={MobileSecondSection} alt="Rising Waves" className="introPic" />}
          <Grid item xs={12} md={6}>
            <h1 className="darkBlueBackgroundHeading">Vulnerable Coastal Communities and Marine Ecosystems</h1>
            <p>According to an <a href="https://www.climate.gov/news-features/understanding-climate/climate-change-ocean-heat-content" target="_blank" rel="noopener noreferrer">article</a> from the National Oceanic and Atmospheric Administration (NOAA), <span className="blueText">climate change</span> is causing coastline changes, which could have dramatic and lasting consequences for coastal communities, such as more intense and more frequent storms, higher sea levels, and higher rates of erosion. Moreover, <span className="blueText">global warming</span> leads to ocean acidification, which could endanger marine life and other organisms living in the ocean.</p>
            <a href="https://arcg.is/18CKDv" target="_blank" rel="noopener noreferrer" className="button">
              <Button variant="contained">Learn More about Santa Cruz's Projected Coastal Vulnerabilities</Button>
            </a>
          </Grid>
          {!mobile &&
            <Grid item md={6} className="placeholder rightPadding">
              <img src={VulnerableCoastalCommunitiesandMarineEcosystems} alt="Rising Waves" className="introPic" />
            </Grid>
          }
        </div>
        <div className={mobile ? "mobileIntroSection" : "introSection"}>
          {mobile && <img src={MobileThirdSection} alt="Device for Taking Photos of Coastline" className="introPic" />}
          <Grid item xs={12} md={6}>
            <h1>Bringing CoastSnap to Santa Cruz</h1>
            <p>CoastSnap is a global project with the goal of monitoring coastline change through community participation in data collection. It <span className="blueText">crowdsources images uploaded by the local community</span>, which is a cost-effective method for monitoring shoreline changes since anyone with a smartphone can contribute. Numerous CoastSnap stations have already been <span className="blueText">successfully implemented in different countries</span> such as Australia, France, the United Kingdom, Spain, and Canada. Along with our project partners, we hope to assist in the development and implementation of CoastSnap in Santa Cruz.</p>
            <a href="https://www.coastsnap.com/" target="_blank" rel="noopener noreferrer" className="button">
              <Button variant="contained">Visit the Official CoastSnap Website</Button>
            </a>
          </Grid>
          {!mobile &&
            <Grid item md={6} className="placeholder rightPadding">
              <img src={BringingCoastSnaptoSantaCruz} alt="Device for Taking Photos of Coastline" className="introPic" />
            </Grid>
          }
        </div>
        <div className={"darkBlueBackground " + (mobile ? "mobileIntroSection" : "introSection")}>
          {mobile && <img src={MobileFourthSection} alt="Scientific Data Trends, City's Climate Adaptation Plans, and the Citizens of Santa Cruz Participating in CoastSnap" className="introPic" />}
          <Grid item xs={12} md={5}>
            <h1 className="darkBlueBackgroundHeading">Citizen Science Efforts with Lasting Impact</h1>
            <p>CoastSnap has the potential to <span className="blueText">increase public awareness</span> on various coastal processes from coastal erosion to sea-level changes in the long-term. Additionally, <span className="blueText">scientists will be better informed</span> about recent changes in the Pacific Coast as well as how climate change affects Santa Cruz's coastal behaviors. Collecting more of this data will help city officials <span className="blueText">make more effective decisions</span> when improving coastal management and climate adaptation plans.</p>
          </Grid>
          {!mobile &&
            <Grid item md={6} className="placeholder rightPadding">
              <img src={CitizenScienceEffortswithLastingImpact} alt="Scientific Data Trends, City's Climate Adaptation Plans, and the Citizens of Santa Cruz Participating in CoastSnap" className="introPic" />
            </Grid>
          }
        </div>
      </Box>
    </div>
  );
};

export default CoastSnapInSantaCruz;