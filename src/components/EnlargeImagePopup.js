import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Enlarges image that user clicked to its original size.
const EnlargeImagePopup = (props) => {
  const { img, description, close } = props;

  // Closes this popup.
  const handleClose = () => {
    close();
  };

  return (
    <Dialog fullScreen open={true} onClose={handleClose} aria-labelledby="enlarge-image-dialog">
      <DialogTitle id="enlarge-image-dialog">
        {description}
        <IconButton aria-label="close" onClick={handleClose} sx={{ position: "absolute", top: 12, right: 10 }}>
          <CloseIcon htmlColor="#090D3A" />
        </IconButton>
      </DialogTitle>
      <DialogContent><img src={img} alt={description} width="100%"/></DialogContent>
    </Dialog>
  );
};

export default EnlargeImagePopup;
