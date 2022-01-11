import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UploadPic from "./components/UploadPic";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="upload" element={<UploadPic />} />
    </Routes>
  );
}

export default App;
