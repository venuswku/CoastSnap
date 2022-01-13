import React, { useEffect } from "react";
import { FormControl, FormHelperText, Button, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { isValid, parseJSON } from "date-fns";
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
  const [dateError, setDateError] = React.useState(false);
  const [timeError, setTimeError] = React.useState(false);

  // Stores the user's chosen photos.
  const onImageChange = (event) => {
    setImages([...event.target.files]);
  };

  // Stores the inputted location.
  const onLocationChange = (event) => {
    setLocation(event.target.value);
    setLocationError(false);
  };

  // Validates the inputted date and time before storing it.
  const onDateTimeChange = (inputDateTime, changeType) => {
    if (!isValid(parseJSON(inputDateTime))) {
      switch (changeType) {
        case "date":
          setDateError(true);
          break;
        case "time":
          setTimeError(true);
          break;
        default:
          break;
      }
    } else if (changeType === "date") {
      dateTime.setMonth(inputDateTime.getMonth());
      dateTime.setDate(inputDateTime.getDate());
      dateTime.setFullYear(inputDateTime.getFullYear());
      setDateError(false);
    } else if (changeType === "time") {
      dateTime.setTime(inputDateTime.getTime());
      setTimeError(false);
    }
  };

  // Submits the user's photo(s) and their inputted info.
  const submitForm = () => {
    let canSubmit = true;

    // On error, display error message(s) for the invalid form field(s).
    if (location.length === 0) {
      setLocationError(true);
      canSubmit = false;
    }
    if (!isValid(parseJSON(dateTime))) {
      setDateError(true);
      setTimeError(true);
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
      <Button variant="contained" endIcon={<PhotoCameraIcon />} style={{margin: "0px 5px 15px"}}>
        Take Photo
      </Button>
      <Button variant="contained" onClick={() => imageUploader.current.click()} endIcon={<InsertPhotoIcon />} style={{margin: "0px 5px 15px"}}>
        Choose Photo
        <input type="file" required multiple accept="image/*" onChange={onImageChange} ref={imageUploader} style={{display: "none"}} />
      </Button>
      {/* Show preview of uploaded image(s). */}
      {imageURLs.map((imgSrc, i) => <img src={imgSrc} alt={images[i].name} key={i} id="uploadedImg" />)}
      <FormControl fullWidth id="form">
        <FormControl error={locationError ? true : false}>
          <InputLabel id="location-label" required>Location</InputLabel>
          <Select
            labelId="location-label"
            id="select-location"
            value={location}
            label="Location"
            onChange={onLocationChange}
          >
            {scLocations.map((loc, i) => <MenuItem value={i} key={i}>{loc}</MenuItem>)}
          </Select>
          {locationError && <FormHelperText>Please select a location.</FormHelperText>}
        </FormControl>
        <TextField id="name-input" label="Name" variant="outlined" />
        <LocalizationProvider dateAdapter={DateAdapter}>
          <FormControl error={dateError ? true : false}>
            <DatePicker
              label="Date *"
              value={dateTime}
              onChange={(newDate) => { onDateTimeChange(newDate, "date"); }}
              renderInput={(params) => <TextField {...params} />}
            />
            {dateError && <FormHelperText>Please input a valid date.</FormHelperText>}
          </FormControl>
          <FormControl error={timeError ? true : false}>
            <TimePicker
              label="Time *"
              value={dateTime}
              onChange={(newTime) => { onDateTimeChange(newTime, "time"); }}
              renderInput={(params) => <TextField {...params} />}
            />
            {timeError && <FormHelperText>Please input a valid time.</FormHelperText>}
          </FormControl>
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
