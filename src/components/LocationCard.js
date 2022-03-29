import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";

const LocationCard = (props) => {
  const { location } = props;
  const image = require(`../images/${location.name}/${location.image}`);

  return (
    <Link to={"/" + location.name} key={location.name} style={{textDecoration: "none"}}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt={location.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {location.name}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              {location.description}
            </Typography> */}
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default LocationCard;
