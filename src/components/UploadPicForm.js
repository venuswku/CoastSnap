import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FormControl, FormHelperText, Button, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { isValid, parseJSON } from "date-fns";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/lab";

const UploadPic = (props) => {
  const { scLocations, togglePopup, setUploadProgress } = props;
  const { search } = useLocation();
  // The specified scope will allow	the user to "View and manage Google Drive files and folders that you have opened or created with this app".
  const SCOPE = "https://www.googleapis.com/auth/drive.file";
  // Retrieves the API discovery document for version 3 of the Google Drive API.
  const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
  const imageUploader = React.useRef(null);
  const [image, setImage] = React.useState(null);
  const [imageURL, setImageURL] = React.useState(null);
  const [photoError, setPhotoError] = React.useState(false);
  const [location, setLocation] = React.useState("");
  const [locationError, setLocationError] = React.useState(false);
  const [dateTime, setDateTime] = React.useState(new Date());
  const [dateError, setDateError] = React.useState(false);
  const [timeError, setTimeError] = React.useState(false);
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  // NOTE: Edit/add more devices here!
  const deviceNotListed = "Not Listed (please enter your device in the following input box)";
  const devices = ["Apple iPhone 13", "Google Pixel 6", "Apple iPhone 13 Pro", "Apple iPhone 13 Pro Max", "Apple iPhone 13 Mini", "Samsung Galaxy Note 20 Ultra", "Samsung Galaxy Z Flip 3", "Google Pixel 5A", "Samsung Galaxy Z Fold 3", "Samsung Galaxy S20 Ultra", "Galaxy S8", "Samsung Galaxy Note 10 Plus", "Galaxy Note 9", "Galaxy S10 Plus", "Galaxy S7 Edge", "Apple iPad Air", "Apple iPad Mini", deviceNotListed];
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
    if (device.length === 0 || (device === deviceNotListed && unlistedDevice.length === 0)) {
      setDeviceError(true);
      canSubmit = false;
    }

    // On success, show confirmation popup & clear out old form input.
    if (canSubmit) {
      setDisableSubmitButton(true);
      togglePopup(true);

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
          const deviceName = (device === deviceNotListed) ? unlistedDevice : device;
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
    
          // 2. Initiate resumable upload session.
          const initResumable = new XMLHttpRequest();
          initResumable.open("POST", "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable", true);
          initResumable.setRequestHeader("Authorization", "Bearer " + oauthToken);
          initResumable.setRequestHeader("Content-Type", "application/json");
          initResumable.setRequestHeader("X-Upload-Content-Length", image.size);
          initResumable.setRequestHeader("X-Upload-Content-Type", contentType);
          initResumable.onreadystatechange = () => {
            if (initResumable.readyState === XMLHttpRequest.DONE && initResumable.status === 200) {
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
                  if (uploadResumable.readyState === XMLHttpRequest.DONE && uploadResumable.status === 200) {
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
                  }
                };
                uploadResumable.send(reader.result);
              };
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
    }
  };

  useEffect(() => {
    // When the form renders, run a script to load the Google API client library
    // since there's no Google Drive API package that can be imported.
    const script = document.createElement("script");
    script.onload = handleClientLoad;
    script.src = "https://apis.google.com/js/api.js";
    document.body.appendChild(script);

    // Preset location if location route parameter exists (for visitors that scanned QR code).
    const queryParams = new URLSearchParams(search);
    const qrCodeLocation = queryParams.get("location");
    if (qrCodeLocation) {
      setLocation(qrCodeLocation);
    }
  }, [search]);

  const handleClientLoad = () => {
    // Documentation for gapi's client library: https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md
    window.gapi.load("client:auth2", () => {
      try {
        window.gapi.client.init({
          "apiKey": process.env.REACT_APP_GOOGLE_API_KEY,
          "clientId": process.env.REACT_APP_GOOGLE_CLIENT_ID,
          "scope": SCOPE,
          "discoveryDocs": [DISCOVERY_DOC]
        });
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
            {devices.map((dev, i) => <MenuItem value={dev} key={i}>{dev}</MenuItem>)}
          </Select>
          {device === deviceNotListed &&
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
