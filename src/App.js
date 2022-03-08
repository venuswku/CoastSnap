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
      // Font styling for MUI components.
      fontFamily: [
        "Fredoka",
        "sans-serif",
      ].join(','),
      // fontSize: "1.2rem",
      button: {
        textTransform: "none",
      }
    },
  });
  const [confirmUpload, setConfirmUpload] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [scrollElement, setScrollElement] = React.useState("");

  return (
    <ThemeProvider theme={theme}>
      <Navbar scrollTo={setScrollElement} />
      <Routes>
        <Route path="/" element={<Home scrollElement={scrollElement} setScrollElement={setScrollElement} />} />
        <Route path="/CoastSnap" element={<Home scrollElement={scrollElement} setScrollElement={setScrollElement} />} />
        <Route path="/upload" element={<UploadPicForm togglePopup={setConfirmUpload} setUploadProgress={setUploadProgress} />} />
        <Route path="/:location" element={<LocationInfo />}></Route>
      </Routes>
      {confirmUpload && <UploadConfirmationPopup open={confirmUpload} togglePopup={setConfirmUpload} progress={uploadProgress} setUploadProgress={setUploadProgress} scrollTo={setScrollElement} />}
    </ThemeProvider>
  );
}

export default App;
