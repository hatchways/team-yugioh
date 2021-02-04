import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@material-ui/core";

const domain = "http://localhost:3001";

const EmbedSchedulerDialog = ({
  showEmbedInstruction,
  setShowEmbedInstruction,
  link,
}) => {
  const [hostName, eventName] = link.split("/") || ["", ""];

  return (
    <Dialog
      open={showEmbedInstruction}
      onClose={() => {
        setShowEmbedInstruction(false);
      }}
    >
      <DialogTitle>Embed this event in your website</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Copy and paste the following code into your html
        </Typography>
        <Typography variant="body1">
          {`<div id="calend-app-inline-widget" data-url="${hostName}/${eventName}" style="min-width: 320px; height: 630px;"></div>`}
        </Typography>
        <Typography variant="body1">
          {`<script type="text/javascript" src="${domain}/assets/widget.bundle.js"></script>`}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default EmbedSchedulerDialog;
