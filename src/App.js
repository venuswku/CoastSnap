import './App.css';
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, lightBlue } from '@mui/material/colors';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import UploadPic from "./components/UploadPic";

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

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="upload" element={<UploadPic />} />
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
