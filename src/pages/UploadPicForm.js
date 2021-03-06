import React, { useEffect, useContext } from "react";
import { WebsiteContext } from "../App";
import { useLocation } from "react-router-dom";
import { FormControl, FormHelperText, Button, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import Seashell from "../images/Upload/Seashell.svg";
import Starfish from "../images/Upload/Starfish.svg";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { isValid, parseJSON } from "date-fns";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/lab";
const scLocationInfo = require("../data/locations.json");
const devicesInfo = require("../data/devices.json");

const UploadPic = () => {
  const { setConfirmUpload, setUploadProgress } = useContext(WebsiteContext);
  const { search } = useLocation();
  // The specified scope will allow	the user to "View and manage Google Drive files and folders that you have opened or created with this app".
  const SCOPE = "https://www.googleapis.com/auth/drive.file";
  // Retrieves the API discovery document for version 3 of the Google Drive API.
  const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
  const imageUploader = React.useRef(null);
  const [image, setImage] = React.useState(null);
  const [imageURL, setImageURL] = React.useState(null);
  const [photoError, setPhotoError] = React.useState(false);
  const scLocations = scLocationInfo.map(loc => loc.name);
  const [location, setLocation] = React.useState("");
  const [locationError, setLocationError] = React.useState(false);
  const [dateTime, setDateTime] = React.useState(new Date());
  const [dateError, setDateError] = React.useState(false);
  const [timeError, setTimeError] = React.useState(false);
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const allDevices = devicesInfo.devices;
  const deviceNotListedOption = devicesInfo.deviceNotListed;
  const [device, setDevice] = React.useState("");
  const [unlistedDevice, setUnlistedDevice] = React.useState("");
  const [deviceError, setDeviceError] = React.useState(false);
  const [comments, setComments] = React.useState("");
  const [disableSubmitButton, setDisableSubmitButton] = React.useState(false);

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
    } else {
      setPhotoError(false);
    }
    if (location.length === 0) {
      setLocationError(true);
      canSubmit = false;
    } else {
      setLocationError(false);
    }
    if (!isValid(parseJSON(dateTime))) {
      setDateError(true);
      setTimeError(true);
      canSubmit = false;
    } else {
      setDateError(false);
      setTimeError(false);
    }
    if (name.trim().length === 0) {
      setNameError(true);
      canSubmit = false;
    } else {
      setNameError(false);
    }
    if (device.length === 0 || (device === deviceNotListedOption && unlistedDevice.length === 0)) {
      setDeviceError(true);
      canSubmit = false;
    } else {
      setDeviceError(false);
    }

    // On success, show confirmation popup & clear out old form input.
    if (canSubmit) {
      setDisableSubmitButton(true);
      setConfirmUpload(true);
      uploadPic();
    }
  };
  
  const uploadPic = () => {
    // 1. Get OAuth access token: https://developers.google.com/identity/protocols/oauth2/web-server#offline
    let oauthToken = "";
    const accessTokenReq = new XMLHttpRequest();
    accessTokenReq.open("POST", "https://oauth2.googleapis.com/token", true);
    accessTokenReq.setRequestHeader("Content-Type", "application/json");
    accessTokenReq.onreadystatechange = () => {
      if (accessTokenReq.readyState === XMLHttpRequest.DONE && accessTokenReq.status === 200) {
        const response = JSON.parse(accessTokenReq.response);
        // console.log(response);
        oauthToken = response.access_token;
  
        // Save photo info.
        const deviceName = (device === deviceNotListedOption) ? unlistedDevice : device;
        const contentType = image.type;
        const additionalComments = comments.trim();
        let description = "Last Modified Date: " + image.lastModifiedDate;
        if (additionalComments.length > 0) {
          description += "; Comments: " + additionalComments;
        }
        const fileName =
          location.replaceAll(" ", "") + "_" +
          dateTime.toDateString().replaceAll(" ", ".") + "_" +
          dateTime.toTimeString().replaceAll(" ", "").replaceAll(":", ".").replaceAll("-", "") + "_" +
          deviceName.replaceAll(" ", "") + "_" +
          name.trim().replaceAll(" ", ".") +
          image.name.substring(image.name.lastIndexOf("."));
        // Properties allowed in metadata: https://developers.google.com/drive/api/v3/reference/files/create
        const metadata = {
          name: fileName,
          mimeType: contentType,
          description: description,
          // parents = IDs of Google Drive folders that you want to save images to.
          parents: [process.env.REACT_APP_GOOGLE_DRIVE_FOLDER_ID],
        };
  
        // 2. Initiate resumable upload session (https://developers.google.com/drive/api/guides/manage-uploads#resumable).
        const initResumable = new XMLHttpRequest();
        initResumable.open("POST", "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable", true);
        initResumable.setRequestHeader("Authorization", "Bearer " + oauthToken);
        initResumable.setRequestHeader("Content-Type", "application/json");
        initResumable.setRequestHeader("X-Upload-Content-Length", image.size);
        initResumable.setRequestHeader("X-Upload-Content-Type", contentType);
        initResumable.onreadystatechange = () => {
          if (initResumable.readyState === XMLHttpRequest.DONE) {
            if (initResumable.status === 200) {
              const locationUrl = initResumable.getResponseHeader("Location");
              const reader = new FileReader();
              reader.readAsArrayBuffer(image);
              reader.onload = (e) => {
                // 3. Upload the image file after the it finished reading/loading.
                const uploadResumable = new XMLHttpRequest();
                uploadResumable.open("PUT", locationUrl, true);
                uploadResumable.setRequestHeader("Content-Type", contentType);
                uploadResumable.setRequestHeader("X-Upload-Content-Type", contentType);
                uploadResumable.upload.onprogress = (event) => {
                  // event.loaded = how many bytes are uploaded
                  // event.total = total number of bytes -> only available if server sends `Content-Length` header
                  setUploadProgress(Math.round((event.loaded / event.total) * 100));
                };
                uploadResumable.onreadystatechange = () => {
                  if (uploadResumable.readyState === XMLHttpRequest.DONE) {
                    if (uploadResumable.status === 200 || uploadResumable.status === 201) {
                      // console.log(uploadResumable.response);
                      // 4. Clear form.
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
                      setDisableSubmitButton(false);
                    } else {
                      // Restart the upload picture for other 3XX, 4XX, or 5XX status codes.
                      uploadPic();
                    }
                  }
                };
                uploadResumable.send(reader.result);
              };
            } else {
              // Tell user to upload using the CoastSnap app if upload request can't be initialized.
              setUploadProgress(-1);
            }
          }
        };
        initResumable.send(JSON.stringify(metadata));
      }
    };
    accessTokenReq.send(JSON.stringify({
      "client_id": process.env.REACT_APP_GOOGLE_CLIENT_ID,
      "client_secret": process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
      "refresh_token": process.env.REACT_APP_GOOGLE_DRIVE_REFRESH_TOKEN,
      "grant_type": "refresh_token",
    }));
  };

  useEffect(() => {
    // When the form renders, run scripts to load the Google API JavaScript client library and Google Identity Services library
    // in order to use the Google Drive API for uploading images and their information.
    const script1 = document.createElement("script");
    script1.src = "https://apis.google.com/js/api.js";
    document.body.appendChild(script1);
    const script2 = document.createElement("script");
    script2.onload = handleClientLoad;
    script2.src = "https://accounts.google.com/gsi/client";
    document.body.appendChild(script2);

    // Preset location if location route parameter exists (for visitors that scanned QR code).
    const queryParams = new URLSearchParams(search);
    const qrCodeLocation = queryParams.get("location");
    if (qrCodeLocation) {
      setLocation(qrCodeLocation);
    }
  }, [search]);

  // Documentation for migrating from deprecated Google Sign-In JavaScript Platform library
  // to Google Identity Services library: https://developers.google.com/identity/oauth2/web/guides/migration-to-gis#implicit_flow_examples
  const handleClientLoad = () => {
    // 1) Load gapi.client.
    window.gapi.load("client", () => {
      try {
        // 2) Initialize gapi.client.
        window.gapi.client.init({}).then(() => {
          try {
            // 3) Load the GIS client.
            window.google.accounts.oauth2.initTokenClient({
              client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
              scope: SCOPE,
              callback: (tokenResponse) => {
                if (tokenResponse && tokenResponse.access_token) {
                  // 4) Set key to allow our client to access the Google Drive API.
                  window.gapi.client.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
                  // 5) Load the Google Drive API discovery document.
                  window.gapi.client.load(DISCOVERY_DOC);
                }
              },
            });
          } catch(error) {
            console.log("Error initializing the Google API client:" + error);
          }
        });
      } catch(error) {
        console.log("Error loading the Google API client:" + error);
      }
    });
  }

  return (
    <div className="centeredContent sandBackground uploadBackground">
      <img src={Seashell} alt="Seashell" className="seashell" />
      <img src={Starfish} alt="Starfish" className="starfish" />
      <FormControl error={photoError ? true : false} style={{marginBottom: "10px"}} className="flexColumnCenter">
        <h1>Upload Your Photo</h1>
        <Button variant="contained" onClick={() => imageUploader.current.click()} endIcon={<InsertPhotoIcon />} style={{width: "fit-content", margin: "0px 5px"}}>
          Choose Photo
          <input type="file" required accept="image/*" onChange={onImageChange} ref={imageUploader} style={{display: "none"}} />
        </Button>
        {photoError && <FormHelperText style={{textAlign: "center"}}>Please add a photo.</FormHelperText>}
      </FormControl>
      {/* Show preview of uploaded image. */}
      {image && imageURL && <img src={imageURL} alt={image.name} id="uploadedImg" />}
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
            {allDevices.map((dev, i) => <MenuItem value={dev} key={i}>{dev}</MenuItem>)}
            <MenuItem value={deviceNotListedOption}>{deviceNotListedOption}</MenuItem>
          </Select>
          {device === deviceNotListedOption &&
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
      <Button variant="contained" onClick={submitForm} disabled={disableSubmitButton}>
        Submit
      </Button>
    </div>
  );
};

export default UploadPic;
