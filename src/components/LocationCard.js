import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import LocImg from "../images/NaturalBridgesSite1_Dec.04.2021_11_39_iphone7.jpeg";

const LocationCard = (props) => {
  const { location } = props;

  return (
    <Link to={"/" + location.name} key={location.name} style={{textDecoration: "none"}}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={LocImg}
            alt={location.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {location.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {location.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default LocationCard;