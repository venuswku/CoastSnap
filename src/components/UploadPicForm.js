import React, { useEffect } from "react";
import { FormControl, FormHelperText, Button, InputLabel, Select, MenuItem, TextField, Stack } from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { isValid, parseJSON } from "date-fns";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/lab";

const UploadPic = (props) => {
  const { togglePopup } = props;
  const imageUploader = React.useRef(null);
  const [image, setImage] = React.useState(null);
  const [imageURL, setImageURL] = React.useState(null);
  const [photoError, setPhotoError] = React.useState(false);
  const scLocations = ["Natural Bridges Site 1", "Natural Bridges Site 2"];
  const [location, setLocation] = React.useState("");
  const [locationError, setLocationError] = React.useState(false);
  let dateTime = new Date();
  const [dateError, setDateError] = React.useState(false);
  const [timeError, setTimeError] = React.useState(false);

  // Stores the user's chosen photos.
  const onImageChange = (event) => {
    setImage(event.target.files[0]);
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

  // Submits the user's photo and their inputted info.
  const submitForm = () => {
    let canSubmit = true;

    // On error, display error message(s) for the invalid form field(s).
    if (image.length === 0 || imageURL.length === 0) {
      setPhotoError(true);
      canSubmit = false;
    }
    if (location.length === 0) {
      setLocationError(true);
      canSubmit = false;
    }
    if (!isValid(parseJSON(dateTime))) {
      setDateError(true);
      setTimeError(true);
      canSubmit = false;
    }

    // On success, show confirmation popup & clear out old form input.
    if (canSubmit) {
      togglePopup(true);
      setImage(null);
      setImageURL(null);
      setLocation("");
      setLocationError(false);
      dateTime = new Date();
      setDateError(false);
      setTimeError(false);
    }
  };

  // For each image object, get its temporary local source with URL.createObjectURL(image).
  useEffect(() => {
    if (image === null) return;
    setImageURL(URL.createObjectURL(image));
  }, [image]);

  return (
    <div className="centeredContent">
      <h1>Upload Your Photo</h1>
      <FormControl error={photoError ? true : false} style={{marginBottom: "10px"}}>
        <Stack direction="row">
          <Button variant="contained" endIcon={<PhotoCameraIcon />} style={{margin: "0px 5px"}}>
            Take Photo
          </Button>
          <Button variant="contained" onClick={() => imageUploader.current.click()} endIcon={<InsertPhotoIcon />} style={{margin: "0px 5px"}}>
            Choose Photo
            <input type="file" required accept="image/*" onChange={onImageChange} ref={imageUploader} style={{display: "none"}} />
          </Button>
        </Stack>
        {photoError && <FormHelperText style={{textAlign: "center"}}>Please add a photo.</FormHelperText>}
      </FormControl>
      {/* Show preview of uploaded image(s). */}
      {image && imageURL && <img src={imageURL} alt={image.name} id="uploadedImg" />}
      <FormControl fullWidth id="form">
        <FormControl error={locationError ? true : false} style={locationError ? {marginBottom: "0px"} : {}}>
          <InputLabel id="location-label" required>Location</InputLabel>
          <Select
            labelId="location-label"
            id="select-location"
            value={location}
            label="Location"
            onChange={onLocationChange}
            style={{ textAlign: "left" }}
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
