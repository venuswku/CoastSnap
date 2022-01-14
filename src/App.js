import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, lightBlue } from '@mui/material/colors';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import UploadPic from "./components/UploadPic";
import UploadConfirmationPopup from "./components/UploadConfirmationPopup";

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

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="upload" element={<UploadPic togglePopup={setConfirmUpload} />} />
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
      {confirmUpload && <UploadConfirmationPopup open={confirmUpload} togglePopup={setConfirmUpload} />}
    </ThemeProvider>
  );
}

export default App;
