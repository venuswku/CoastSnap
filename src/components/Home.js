import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Button variant="contained">
      <Link to="/upload" className="uploadButton">Upload Your Photo</Link>
    </Button>
  );
};
  
export default Home;
