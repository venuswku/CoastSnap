import React, { useContext } from "react";
import { WebsiteContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, useTheme, useMediaQuery, CircularProgress } from "@mui/material";

const UploadConfirmationPopup = () => {
  const { confirmUpload, setConfirmUpload, uploadProgress, setUploadProgress, setScrollElement } = useContext(WebsiteContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = (nextPath) => {
    setConfirmUpload(false);
    if (nextPath === "upload") {
      window.location.reload(false);
    } else if (nextPath === "") {
      navigate("/" + nextPath);
    }
    setUploadProgress(0);
  };

  return (
    <div>
      {uploadProgress === -1 ?
        <Dialog
          fullScreen={tablet}
          open={confirmUpload}
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
            <Button onClick={() => {setScrollElement("upload"); handleClose("");}} autoFocus>
              Download App
            </Button>
            <Button onClick={() => handleClose("")} autoFocus>
              Return Home
            </Button>
          </DialogActions>
        </Dialog> :
        uploadProgress === 100 ?
          <Dialog
            fullScreen={tablet}
            open={confirmUpload}
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
            open={confirmUpload}
            aria-labelledby="confirmation-dialog"
            aria-describedby="confirmation-dialog-description"
          >
            <DialogTitle id="confirmation-dialog">
              Uploading Photo...
            </DialogTitle>
            <DialogContent className="centeredContent" id="confirmation-dialog-description">
              <CircularProgress variant="determinate" value={uploadProgress} />
              <DialogContentText>{uploadProgress}% Complete</DialogContentText>
            </DialogContent>
          </Dialog>
      }
    </div>
  );
};

export default UploadConfirmationPopup;
