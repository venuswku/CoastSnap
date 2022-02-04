import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, lightBlue } from "@mui/material/colors";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import UploadPicForm from "./components/UploadPicForm";
import UploadConfirmationPopup from "./components/UploadConfirmationPopup";
import LocationInfo from "./components/LocationInfo";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: blue[500],
      },
      secondary: {
        main: lightBlue[500],
      },
    },
    typography: {
      button: {
        textTransform: "none",
      }
    },
  });
  const [confirmUpload, setConfirmUpload] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [scrollElement, setScrollElement] = React.useState("");
  // NOTE: Add more location info here!
  const scLocationInfo = [
    {
      name: "Natural Bridges Site 1",
      description: "Description for Natural Bridges Site 1...",
      timelapseVids: ["https://youtu.be/akhXr-6nG5g"],
    },
    {
      name: "Natural Bridges Site 2",
      description: "Different description for Natural Bridges Site 2...",
      timelapseVids: ["https://youtu.be/godDAPrjYwY"],
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Navbar scrollElement={scrollElement} scrollTo={setScrollElement} />
      <Routes>
        <Route path="/" element={<Home scLocations={scLocationInfo} scrollElement={scrollElement} />} />
        <Route path="/CoastSnap" element={<Home scLocations={scLocationInfo} scrollElement={scrollElement} />} />
        <Route path="/upload" element={<UploadPicForm togglePopup={setConfirmUpload} setUploadProgress={setUploadProgress} scLocations={scLocationInfo.map(loc => loc.name)} />} />
        <Route path="/:location" element={<LocationInfo scLocations={scLocationInfo} />}></Route>
      </Routes>
      {confirmUpload && <UploadConfirmationPopup open={confirmUpload} togglePopup={setConfirmUpload} progress={uploadProgress} />}
    </ThemeProvider>
  );
}

export default App;
