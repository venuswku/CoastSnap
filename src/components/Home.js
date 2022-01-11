import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="appHeader">
      <h1>CoastSnap</h1>
      <br />
      <ul>
        <li>
          {/* Endpoint to route to Home component */}
          <Link to="/">Home</Link>
        </li>
        {/* <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contactus">Contact Us</Link>
        </li> */}
      </ul>
      <button className="uploadButton">
        <Link to="/upload">Upload Your Photo</Link>
      </button>
    </div>
  );
};
  
export default Home;
