import './App.css';
import React, { useEffect, createContext } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, lightBlue } from "@mui/material/colors";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import UploadPicForm from "./pages/UploadPicForm";
import LocationInfo from "./pages/LocationInfo";
import UploadConfirmationPopup from "./components/UploadConfirmationPopup";
import Footer from "./components/Footer";

export const WebsiteContext = createContext();

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
      h6: {
        color: "#090D3A",
        fontWeight: "bold",
      },
      body1: {
        fontFamily: [
          "Lato",
          "sans-serif",
        ].join(",")
      },
      fontFamily: [
        "Fredoka",
        "sans-serif",
      ].join(","),
      button: {
        textTransform: "none",
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 20,
          },
        }, 
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fill: "#ffffff",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "20px",
          },
        },
      },
    },
  });
  const [confirmUpload, setConfirmUpload] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [scrollElement, setScrollElement] = React.useState("");

  // Scroll to top of a page whenever the URL route changes (only for pages that aren't the homepage).
  const location = useLocation();
  useEffect(() => {
    if ((location.pathname !== "/" && location.pathname !== "/CoastSnap/") && scrollElement === "") {
      window.scrollTo(0,0);
    }
  }, [location, scrollElement]);

  return (
    <ThemeProvider theme={theme}>
      <WebsiteContext.Provider value={{ confirmUpload, setConfirmUpload, uploadProgress, setUploadProgress, scrollElement, setScrollElement }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CoastSnap" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/upload" element={<UploadPicForm />} />
          <Route path="/:location" element={<LocationInfo />}></Route>
        </Routes>
        {confirmUpload && <UploadConfirmationPopup />}
        <Footer className="footer" />
      </WebsiteContext.Provider>
    </ThemeProvider>
  );
}

export default App;
