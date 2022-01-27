import React, { useEffect } from "react";
import { FormControl, FormHelperText, Button, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { isValid, parseJSON } from "date-fns";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/lab";

const UploadPic = (props) => {
  const { togglePopup } = props;
  const [googleAuth, setGoogleAuth] = React.useState("");
  // The specified scope will allow	the user to "View and manage Google Drive files and folders that you have opened or created with this app".
  const SCOPE = "https://www.googleapis.com/auth/drive.file";
  // Retrieves the API discovery document for version 3 of the Google Drive API.
  const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
  const imageUploader = React.useRef(null);
  const [image, setImage] = React.useState(null);
  const [imageURL, setImageURL] = React.useState(null);
  const [photoError, setPhotoError] = React.useState(false);
  const scLocations = ["Natural Bridges Site 1", "Natural Bridges Site 2"];
  const [location, setLocation] = React.useState("");
  const [locationError, setLocationError] = React.useState(false);
  const [dateTime, setDateTime] = React.useState(new Date());
  const [dateError, setDateError] = React.useState(false);
  const [timeError, setTimeError] = React.useState(false);
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const devices = ["Apple iPhone 13", "Google Pixel 6", "Apple iPhone 13 Pro", "Apple iPhone 13 Pro Max", "Apple iPhone 13 Mini", "Samsung Galaxy Note 20 Ultra", "Samsung Galaxy Z Flip 3", "Google Pixel 5A", "Samsung Galaxy Z Fold 3", "Samsung Galaxy S20 Ultra", "Galaxy S8", "Samsung Galaxy Note 10 Plus", "Galaxy Note 9", "Galaxy S10 Plus", "Galaxy S7 Edge", "Apple iPad Air", "Apple iPad Mini", "Not Listed"];
  const [device, setDevice] = React.useState("");
  const [unlistedDevice, setUnlistedDevice] = React.useState("");
  const [deviceError, setDeviceError] = React.useState(false);
  const [comments, setComments] = React.useState("");

  // Stores the user's chosen photos.
  const onImageChange = (event) => {
    setImage(event.target.files[0]);
    // Get the image object's temporary local source with URL.createObjectURL().
    setImageURL(URL.createObjectURL(event.target.files[0]));
  };

  // Stores the selected option.
  const onSelectChange = (selectedOption, type) => {
    if (type === "location") {
      setLocation(selectedOption);
      setLocationError(false);
    } else if (type === "device") {
      setDevice(selectedOption);
      setDeviceError(false);
    }
  };

  // Stores the inputted text.
  const onTextChange = (newTextValue, type) => {
    if (type === "name") {
      setName(newTextValue);
    } else if (type === "comments") {
      setComments(newTextValue);
    } else if (type === "device") {
      setUnlistedDevice(newTextValue);
    }
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
    if (image === null || imageURL === null) {
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
    if (name.trim().length === 0) {
      setNameError(true);
      canSubmit = false;
    }
    if (device.length === 0 || (device === "Not Listed" && unlistedDevice.length === 0)) {
      setDeviceError(true);
      canSubmit = false;
    }

    // On success, show confirmation popup & clear out old form input.
    if (canSubmit) {
      // Save photo info.
      googleAuth.signIn();
      const user = googleAuth.currentUser.get();
      if (user) {
        console.log("Full Name:", user.su.qf);
        const isAuthorized = user.hasGrantedScopes(SCOPE);
        if (isAuthorized) {
          const boundary = "..............................";
          const delimiter = "\r\n--" + boundary + "\r\n";
          const close_delim = "\r\n--" + boundary + "--";
          const deviceName = (device === "Not Listed") ? unlistedDevice : device;
          const fileName =
            location.replaceAll(" ", "") + "_" +
            dateTime.toDateString().replaceAll(" ", ".") + "_" +
            dateTime.toTimeString().replaceAll(" ", ".").replaceAll(":", "-") + "_" +
            deviceName.replaceAll(" ", "") + "_" +
            name.trim().replaceAll(" ", ".") +
            ".jpg";
          const fileData = image;
          const contentType = image.type;
          const additionalInfo = comments.trim();
          const metadata = {
            "name": fileName,
            "mimeType": contentType,
            "description": additionalInfo,
          };

          const multipartRequestBody =
            delimiter +
            "Content-Type: application/json; charset=UTF-8\r\n\r\n" + JSON.stringify(metadata) +
            delimiter +
            "Content-Type: " + contentType + "\r\n\r\n" + fileData + "\r\n"+
            close_delim;

          console.log(multipartRequestBody);
          // const request = window.gapi.client.request({
          //   "path": "https://www.googleapis.com/upload/drive/v3/files",
          //   "method": "POST",
          //   "params": { "uploadType": "multipart" },
          //   "headers": {
          //     "Content-Type": "multipart/related; boundary=" + boundary + ""
          //   },
          //   "body": multipartRequestBody
          // });

          // request.execute((file) => {
          //   console.log(file);
          // });
        }
      }
      
      // Clear form.
      togglePopup(true);
      setImage(null);
      setImageURL(null);
      setLocation("");
      setLocationError(false);
      setDateTime(new Date());
      setDateError(false);
      setTimeError(false);
      setName("");
      setNameError(false);
      setDevice("");
      setUnlistedDevice("");
      setDeviceError(false);
      setComments("");
    }
  };

  // When the form renders, run a script to load the Google API client
  // since there's no Google Drive API package that can be imported.
  useEffect(() => {
    const script = document.createElement('script');
    script.onload = handleClientLoad;
    script.src = "https://apis.google.com/js/api.js";
    document.body.appendChild(script);
  }, []);

  const handleClientLoad = () => {
    window.gapi.load("client:auth2", () => {
      try {
        window.gapi.client.init({
            "apiKey": process.env.REACT_APP_GOOGLE_DRIVE_API_KEY,
            "clientId": process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID,
            "scope": SCOPE,
            "discoveryDocs": [DISCOVERY_DOC]
          }).then(() => {
            setGoogleAuth(window.gapi.auth2.getAuthInstance());
          }
        );
      } catch(error) {
        console.log(error);
      }
    });
  }

  return (
    <div className="centeredContent">
      <h1>Upload Your Photo</h1>
      <FormControl error={photoError ? true : false} style={{marginBottom: "10px"}}>
        <Button variant="contained" onClick={() => imageUploader.current.click()} endIcon={<InsertPhotoIcon />} style={{margin: "0px 5px"}}>
          Choose Photo
          <input type="file" required accept="image/*" onChange={onImageChange} ref={imageUploader} style={{display: "none"}} />
        </Button>
        {photoError && <FormHelperText style={{textAlign: "center"}}>Please add a photo.</FormHelperText>}
      </FormControl>
      {/* Show preview of uploaded image(s). */}
      {image && imageURL && <img src={imageURL} alt={image.name} id={image.name} />}
      <FormControl fullWidth id="form">
        <FormControl error={locationError ? true : false} style={locationError ? {marginBottom: "0px"} : {}}>
          <InputLabel id="location-label" required>Location</InputLabel>
          <Select
            labelId="location-label"
            id="select-location"
            value={location}
            label="Location"
            onChange={(event) => onSelectChange(event.target.value, "location")}
            style={{ textAlign: "left" }}
          >
            {scLocations.map((loc, i) => <MenuItem value={loc} key={i}>{loc}</MenuItem>)}
          </Select>
          {locationError && <FormHelperText>Please select a location.</FormHelperText>}
        </FormControl>
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
        <FormControl error={nameError ? true : false}>
          <TextField
            id="name-input"
            label="Name *"
            error={nameError ? true : false}
            value={name}
            onChange={(event) => onTextChange(event.target.value, "name")}
            variant="outlined"
          />
          {nameError && <FormHelperText>Please enter your name.</FormHelperText>}
        </FormControl>
        <FormControl error={deviceError ? true : false} style={{marginBottom: "0px"}}>
          <InputLabel id="device-label" required>Device</InputLabel>
          <Select
            labelId="device-label"
            id="select-device"
            value={device}
            label="Device"
            onChange={(event) => onSelectChange(event.target.value, "device")}
            style={{ textAlign: "left" }}
          >
            {devices.map((dev, i) => <MenuItem value={dev} key={i}>{dev}</MenuItem>)}
          </Select>
          {device === "Not Listed" &&
            <TextField
              id="device-input"
              label="If your device isn't listed above, please enter the name of your device here:"
              error={deviceError ? true : false}
              value={unlistedDevice}
              onChange={(event) => onTextChange(event.target.value, "device")}
              variant="outlined"
              style={{marginTop: "10px"}}
            />
          }
          {deviceError ?
            <FormHelperText>Please select/enter the device that you used to take the photo.</FormHelperText> :
            <FormHelperText>Mobile device or tablet that was used to take the photo.</FormHelperText>
          }
        </FormControl>
        <TextField
          id="comments-input"
          label="Comments"
          value={comments}
          onChangeCapture={(event) => onTextChange(event.target.value, "comments")}
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
