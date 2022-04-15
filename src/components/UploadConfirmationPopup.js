import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, useTheme, useMediaQuery, CircularProgress } from "@mui/material";

const UploadConfirmationPopup = (props) => {
  const { open, togglePopup, progress, setUploadProgress, scrollTo } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = (nextPath) => {
    togglePopup(false);
    if (nextPath === "upload") {
      window.location.reload(false);
    } else if (nextPath === "") {
      navigate("/" + nextPath);
    }
    setUploadProgress(0);
  };

  return (
    <div>
      {progress === -1 ?
        <Dialog
          fullScreen={tablet}
          open={open}
          onClose={() => handleClose("upload")}
          aria-labelledby="confirmation-dialog"
          aria-describedby="confirmation-dialog-description"
        >
          <DialogTitle id="confirmation-dialog">
            Upload Unsuccessful
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="confirmation-dialog-description">
              {"Sorry for the inconvenience, our website currently can't process your upload. Please upload your photo through the CoastSnap app instead. Thank you for understanding!"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {scrollTo("upload"); handleClose("");}} autoFocus>
              Download App
            </Button>
            <Button onClick={() => handleClose("")} autoFocus>
              Return Home
            </Button>
          </DialogActions>
        </Dialog> :
        progress === 100 ?
          <Dialog
            fullScreen={tablet}
            open={open}
            onClose={() => handleClose("upload")}
            aria-labelledby="confirmation-dialog"
            aria-describedby="confirmation-dialog-description"
          >
            <DialogTitle id="confirmation-dialog">
              Upload Successful
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="confirmation-dialog-description">
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
            fullScreen={tablet}
            open={open}
            aria-labelledby="confirmation-dialog"
            aria-describedby="confirmation-dialog-description"
          >
            <DialogTitle id="confirmation-dialog">
              Uploading Photo...
            </DialogTitle>
            <DialogContent className="centeredContent" id="confirmation-dialog-description">
              <CircularProgress variant="determinate" value={progress} />
              <DialogContentText>{progress}% Complete</DialogContentText>
            </DialogContent>
          </Dialog>
      }
    </div>
  );
};

export default UploadConfirmationPopup;
