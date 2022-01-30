import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, useTheme, useMediaQuery, CircularProgress } from "@mui/material";

const UploadConfirmationPopup = (props) => {
  const { open, togglePopup, progress } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = (nextPath) => {
    togglePopup(false);
    if (nextPath === "upload") {
      window.location.reload(false);
    } else if (nextPath === "") {
      navigate("/" + nextPath);
    }
  };

  return (
    <div>
      {progress === 100 ?
        <Dialog
          fullScreen={mobile}
          open={open}
          onClose={() => handleClose("upload")}
          aria-labelledby="confirmation-dialog"
        >
          <DialogTitle id="confirmation-dialog">
            Upload Successful
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {"Your photo has been successfully uploaded! Thank you for participating in CoastSnap's mission to capture changing coastlines."}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose("upload")} autoFocus>
              Upload Another Photo
            </Button>
            <Button onClick={() => handleClose("")} autoFocus>
              Return Home
            </Button>
          </DialogActions>
        </Dialog> :
        <Dialog
          fullScreen={mobile}
          open={open}
          aria-labelledby="confirmation-dialog"
        >
          <DialogTitle id="confirmation-dialog">
            Uploading Photo...
          </DialogTitle>
          <DialogContent className="centeredContent">
            <CircularProgress variant="determinate" value={progress} />
            <DialogContentText>{progress}% Complete</DialogContentText>
          </DialogContent>
        </Dialog>
      }
    </div>
  );
};

export default UploadConfirmationPopup;
