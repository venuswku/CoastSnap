import React from "react";
import { useTheme, useMediaQuery, Grid } from "@mui/material";
import Monitors from "../images/Homepage/MonitorsCoastalChange.svg";
import Encourages from "../images/Homepage/EncouragesCommunityParticipation.svg";
import Educates from "../images/Homepage/EducatesAboutClimateChange.svg";

const CoastSnapFeatures = () => {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className="flexColumnCenter defaultPadding">
      <h1 className="featuresMargin">Building Resilience to Climate Change</h1>
      {tablet ?
        <Grid container direction="row" justifyContent="center" alignItems="flex-end" spacing={{ xs: 2, md: 6 }} className="featuresMargin">
          <Grid item xs={12}>
            <img src={Monitors} alt="Observing Coastal Data Trends" style={{width: "20%"}} />
            <h2>Monitors Coastal Change</h2>
            <p>Crowdsourcing images from the community helps local governments, researchers and scientists monitor our dynamic coast.</p>
          </Grid>
          <Grid item xs={12}>
            <img src={Encourages} alt="Community of All Ages, Incomes and Abilities" style={{width: "50%"}} />
            <h2>Encourages Community Participation</h2>
            <p>We welcome residents and tourists of all ages, incomes and abilities to actively participate in the data collection process.</p>
          </Grid>
          <Grid item xs={12}>
            <img src={Educates} alt="Writing Coastal Adaptation Plan" style={{width: "25%"}} />
            <h2>Educates About Climate Change</h2>
            <p>Public participation raises community awareness, motivation and empowerment to build a more resilient coast in the face of climate change.</p>
          </Grid>
        </Grid>
      :
        <div>
          <Grid container direction="row" justifyContent="center" alignItems="flex-end" spacing={{ xs: 2, md: 6 }} className="featuresMargin">
            <Grid item md={4}>
              <img src={Monitors} alt="Observing Coastal Data Trends" style={{width: "40%"}} />
            </Grid>
            <Grid item md={4}>
              <img src={Encourages} alt="Community of All Ages, Incomes and Abilities" style={{width: "80%"}} />
            </Grid>
            <Grid item md={4}>
              <img src={Educates} alt="Writing Coastal Adaptation Plan" style={{width: "45%"}} />
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 2, md: 6 }}>
            <Grid item md={4}>
              <h2>Monitors Coastal Change</h2>
            </Grid>
            <Grid item md={4}>
              <h2>Encourages Community Participation</h2>
            </Grid>
            <Grid item md={4}>
              <h2>Educates About Climate Change</h2>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={{ xs: 2, md: 6 }}>
            <Grid item md={4}>
              <p>Crowdsourcing images from the community helps local governments, researchers and scientists monitor our dynamic coast.</p>
            </Grid>
            <Grid item md={4}>
              <p>We welcome residents and tourists of all ages, incomes and abilities to actively participate in the data collection process.</p>
            </Grid>
            <Grid item md={4}>
              <p>Public participation raises community awareness, motivation and empowerment to build a more resilient coast in the face of climate change.</p>
            </Grid>
          </Grid>
        </div>
      }
    </div>
  );
};

export default CoastSnapFeatures;