import React, { useContext } from "react";
import { WebsiteContext } from "../App";
import { Box, Grid, Button } from "@mui/material";
const sections = require("../data/coastsnapInSantaCruz.json");

// Import all images for this component.
const importAll = (r) => {
  return r.keys().map(item => r(item));
};
const images = importAll(require.context("../images/CoastSnap In Santa Cruz", false, /\.svg/));
const mobileImages = importAll(require.context("../images/CoastSnap In Santa Cruz/mobile", false, /\.svg/));

// Component that explains why we want to bring CoastSnap to Santa Cruz.
// IMPORTANT: If you want to edit the text for a section, make sure to edit the text in src/data/coastsnapInSantaCruz.json!
const CoastSnapInSantaCruz = () => {
  const { tablet } = useContext(WebsiteContext);

  return (
    <div>
      {/*
        The text here is just a placeholder for the illustrations to be horizontally aligned with each section, so this text is invisible on the website.
        This is the only way I (Venus) knows how to make sticky positioning for the illustrations to align, but you are more than welcome to optimize this if you find a better way!
      */}
      <Box className="introSectionsWrapper" sx={{ position: "absolute", display: { xs: "none", md: "grid" }, zIndex: -1 }}>
        {sections.map((section, i) => (
          <div className="stickySection introSection" key={i}>
            <Grid item md={6} className="placeholder">
              <h1>{section.title}</h1>
              <p dangerouslySetInnerHTML={{ __html: section.text }}></p>
              {section.button &&
                <a href={section.button[0]} target="_blank" rel="noopener noreferrer" className="button">
                  <Button variant="contained">{section.button[1]}</Button>
                </a>
              }
            </Grid>
            <Grid item md={5} className="defaultRightPadding">
              <img src={images[i]} alt={section.image} className="fullWidth" />
            </Grid>
          </div>
        ))}
      </Box>
      {/*
        The following text is actually displayed on the website.
        Instead, pictures in these sections are invisible and act as placeholders. 
      */}
      <Box className="introSectionsWrapper" sx={{ display: { xs: "flex", md: "grid" }}}>
      {sections.map((section, i) => (
        <div className={tablet ? "mobileIntroSection centerText" : "introSection"} key={i}>
          {tablet && <img src={mobileImages[i]} alt={section.image} className="fullWidth" />}
          <Grid item xs={12} md={6}>
            <h1>{section.title}</h1>
            <p dangerouslySetInnerHTML={{ __html: section.text }}></p>
            {section.button &&
              <a href={section.button[0]} target="_blank" rel="noopener noreferrer" className="button">
                <Button variant="contained">{section.button[1]}</Button>
              </a>
            }
          </Grid>
          {!tablet &&
            <Grid item md={5} className="placeholder defaultRightPadding">
              <img src={images[i]} alt={section.image} className="fullWidth" />
            </Grid>
          }
        </div>
      ))}
      </Box>
    </div>
  );
};

export default CoastSnapInSantaCruz;