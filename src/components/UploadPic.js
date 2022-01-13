import React, { useEffect } from "react";
import { FormControl, FormHelperText, Button, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/lab";

const UploadPic = () => {
  const navigate = useNavigate();
  const imageUploader = React.useRef(null);
  const [images, setImages] = React.useState([]);
  const [imageURLs, setImageURLs] = React.useState([]);
  const scLocations = ["Natural Bridges Site 1", "Natural Bridges Site 2"];
  const [location, setLocation] = React.useState("");
  const [locationError, setLocationError] = React.useState(false);
  const dateTime = new Date();

  const onImageChange = (event) => {
    setImages([...event.target.files]);
  };

  const submitForm = () => {
    let canSubmit = true;

    // On error, display error message(s) for the invalid form field(s).
    if (location.length === 0) {
      setLocationError(true);
      canSubmit = false;
    }

    // On success, show confimation popup & navigate back to homepage.
    if (canSubmit) {
      navigate("/");
    }
  };

  // For each image object, get its temporary local source with URL.createObjectURL(image).
  useEffect(() => {
    if (images.length < 1) return;
    const newImageURLs = [];
    images.forEach(image => newImageURLs.push(URL.createObjectURL(image)));
    setImageURLs(newImageURLs);
  }, [images]);

  return (
    <div className="centeredContent">
      <h1>Upload Your Photo</h1>
      {/* Show preview of uploaded image(s). */}
      {imageURLs.map((imgSrc, i) => <img src={imgSrc} alt={images[i].name} key={i} />)}
      <Button variant="contained" endIcon={<PhotoCameraIcon />}>
        Take Photo
      </Button>
      <Button variant="contained" onClick={() => imageUploader.current.click()} endIcon={<InsertPhotoIcon />}>
        Choose Photo
        <input type="file" required multiple accept="image/*" onChange={onImageChange} ref={imageUploader} style={{display: "none"}} />
      </Button>
      <FormControl fullWidth>
        <InputLabel id="location-label" required>Location</InputLabel>
        <Select
          labelId="location-label"
          id="select-location"
          value={location}
          label="Location"
          onChange={(event) => setLocation(event.target.value)}
        >
          {scLocations.map((loc, i) => <MenuItem value={i} key={i}>{loc}</MenuItem>)}
        </Select>
        {locationError && <FormHelperText>Please select the location.</FormHelperText>}
        <TextField id="name-input" label="Name" variant="outlined" />
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            label="Date *"
            value={dateTime}
            onChange={(newDate) => {
              dateTime.setMonth(newDate.getMonth());
              dateTime.setDate(newDate.getDate());
              dateTime.setFullYear(newDate.getFullYear());
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            label="Time *"
            value={dateTime}
            onChange={(newTime) => { dateTime.setTime(newTime.getTime()); }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          id="comments-input"
          label="Comments"
          multiline
        />
      </FormControl>
      <Button variant="contained" onClick={submitForm}>
        Submit
      </Button>
    </div>
  );
};

export default UploadPic;
