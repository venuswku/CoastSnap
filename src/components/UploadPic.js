import React from "react";
import { FormControl, Button, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DatePicker, TimePicker, DateTimePicker } from "@mui/lab";

const UploadPic = () => {
  const scLocations = ["Natural Bridges Site 1", "Natural Bridges Site 2"];
  const [location, setLocation] = React.useState("");
  const [dateTime, setDateTime] = React.useState(new Date());
  // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="centeredContent">
      <h1>Upload Your Photo</h1>
      <Button variant="contained">
        Take Photo
      </Button>
      <Button variant="contained">
        Choose Photo
      </Button>
      <FormControl fullWidth>
        <InputLabel id="select-location-label" required>Location</InputLabel>
        <Select
          labelId="select-location-label"
          id="select"
          value={location}
          label="Location"
          onChange={(event) => setLocation(event.target.value)}
        >
          {scLocations.map((loc, i) => <MenuItem value={i} key={i}>{loc}</MenuItem>)}
        </Select>
        <TextField id="name-input" label="Name (Optional)" variant="outlined" />
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
            onChange={(newTime) => {
              dateTime.setTime(newTime.getTime());
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          {/* <DateTimePicker
            renderInput={(params) => <TextField {...params} />}
            value={dateTime}
            label="Date &amp; Time"
            onChange={(newValue) => { setDateTime(newValue); }}
          /> */}
        </LocalizationProvider>
      </FormControl>
      <Button variant="contained">
        <Link to="/" className="uploadButton">Submit</Link>
      </Button>
    </div>
  );
};
  
export default UploadPic;
