import React from "react";
import { Box, Button, InputLabel, Select, MenuItem, TextField } from "@mui/material";
// import { AdapterDateFns, LocalizationProvider, DatePicker } from "@mui/lab";
import { Link } from "react-router-dom";

const UploadPic = () => {
  const scLocations = ["Natural Bridges Site 1", "Natural Bridges Site 2"];
  const [location, setLocation] = React.useState("");
  // const [date, setDate] = React.useState(new Date());

  return (
    <div className="appHeader">
      <h1>Upload Your Photo</h1>
      <Box
        component="form"
        // sx={{
        //   '& .MuiTextField-root': { m: 1, width: '25ch' },
        // }}
        noValidate
        autoComplete="off"
      >
        <Button variant="contained">
          Take Photo
        </Button>
        <InputLabel id="select-location-label">Location</InputLabel>
        <Select
          labelId="select-location-label"
          id="select"
          value={location}
          label="Location"
          onChange={(event) => setLocation(event.target.value)}
        >
          {scLocations.map((loc, i) => <MenuItem value={i} key={i}>{loc}</MenuItem>)}
        </Select>
        <TextField id="name-text-field" label="Name (Optional)" variant="outlined" />
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            disableFuture
            label="Date"
            openTo="year"
            views={['year', 'month', 'day']}
            value={date}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider> */}
        <Button variant="contained">
          <Link to="/" className="uploadButton">Submit</Link>
        </Button>
      </Box>
    </div>
  );
};
  
export default UploadPic;
