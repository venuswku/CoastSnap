import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Grid, Card, CardContent, Typography } from "@mui/material";
import { UploadButton } from "./Navbar";
import AppleIcon from "@mui/icons-material/Apple";
import ShopRoundedIcon from "@mui/icons-material/ShopRounded";

const MethodsForUploadingPics = () => {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Two Methods to Upload a Photo</h2>
      <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 1, md: 4 }} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: "center", backgroundColor: "#c9e9f7" }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Use this Website
              </Typography>
              <Typography color="text.secondary" sx={{ marginBottom: "8px" }}>
                Fill out our form with your name, device and location, then submit your photo!
              </Typography>
              <Link to="/upload" className="button">
                <UploadButton variant="contained">Upload Now!</UploadButton>
              </Link>
            </CardContent>
          </Card>
        </Grid>
        <Typography variant="h7" component="div">OR</Typography>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: "center", backgroundColor: "#c9e9f7" }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Download the App
              </Typography>
              <Stack direction="column" spacing={1}>
                <Typography color="text.secondary">
                  Register your own user account with an email address, then start snapping!
                </Typography>
                <a href="https://apps.apple.com/us/app/coastsnap-spotteron/id1529921850" target="_blank" rel="noopener noreferrer" className="button">
                  <Button variant="contained" startIcon={<AppleIcon />}>App Store for Apple</Button>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.spotteron.coastsnap" target="_blank" rel="noopener noreferrer" className="button">
                  <Button variant="contained" startIcon={<ShopRoundedIcon />}>Google Play for Android</Button>
                </a>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Stack>
    </div>
  );
};

export default MethodsForUploadingPics;