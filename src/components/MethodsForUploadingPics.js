import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Grid, Card, CardContent, Typography } from "@mui/material";
import WebsiteLogo from "../images/Homepage/WebsiteLogo.svg";
import CoastSnapAppLogo from "../images/Homepage/CoastSnapAppLogo.svg";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AppleIcon from "@mui/icons-material/Apple";
import ShopRoundedIcon from "@mui/icons-material/ShopRounded";

const MethodsForUploadingPics = () => {
  return (
    <div className="darkBlueBackground centerText defaultPadding">
      <h1>Support Our Coast</h1>
      <p>The submission of coastline photographs by locals and tourists is crucial to create a large, diverse collection of data on Santa Cruz beaches. As long as you have a <span className="blueText">smartphone connected to WiFi or data</span>, you are ready to contribute! After taking a photo at one of the CoastSnap stations, <span className="blueText">upload your photo</span> through this website or the CoastSnap app. This collection of photographs will enable data collection on climate patterns in Santa Cruz coastlines and enable public interactions with climate issues from local citizens and passerby.</p>
      <Grid container direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 4 }} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={5} md={4}>
          <Card>
            <CardContent>
              <img src={WebsiteLogo} alt="Website Logo" style={{ width: "50%" }} />
              <Typography variant="h6" component="div">
                Use this Website
              </Typography>
              <Typography color="text.secondary" sx={{ marginBottom: "8px" }}>
                Fill out our form with your name, device and location, then submit your photo!
              </Typography>
              <Link to="/upload" className="button">
                <Button variant="contained" startIcon={<PhoneIphoneIcon />}>Upload Now</Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={5} md={4}>
          <Card>
            <CardContent>
              <img src={CoastSnapAppLogo} alt="CoastSnap App Logo" style={{ width: "70%" }} />
              <Typography variant="h6" component="div">
                Download the App
              </Typography>
              <Typography color="text.secondary" sx={{ marginBottom: "8px" }}>
                Register your own user account with an email address, then start snapping!
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} justifyContent="center" spacing={1}>
                <a href="https://apps.apple.com/us/app/coastsnap-spotteron/id1529921850" target="_blank" rel="noopener noreferrer" className="button">
                  <Button variant="contained" startIcon={<AppleIcon />}>App Store</Button>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.spotteron.coastsnap" target="_blank" rel="noopener noreferrer" className="button">
                  <Button variant="contained" startIcon={<ShopRoundedIcon />}>Google Play</Button>
                </a>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default MethodsForUploadingPics;