import React from "react";
import { Link } from "react-router-dom";

const UploadPic = () => {
  return (
    <div className="appHeader">
      <h1>Upload Your Photo</h1>
      <button className="uploadButton">
        <Link to="/upload">Upload Your Photo</Link>
      </button>
    </div>
  );
};
  
export default UploadPic;
