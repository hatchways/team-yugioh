import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { CopyBlock, a11yLight } from "react-code-blocks";

const domain = "http://localhost:3000";

const EmbedSchedulerDialog = ({
  showEmbedInstruction,
  setShowEmbedInstruction,
  link,
}) => {
  const classes = useStyles();
  const [hostName, eventName] = link.split("/") || ["", ""];
  const code = `<div id="calend-app-inline-widget" data-url="${hostName}/${eventName}" style="min-width: 320px; height: 630px;"></div>\n<script type="text/javascript" src="${domain}/assets/widget.bundle.js"></script>`;
  return (
    <Dialog
      open={showEmbedInstruction}
      onClose={() => {
        setShowEmbedInstruction(false);
      }}
      className={classes.dialog}
      fullWidth={true}
    >
      <DialogTitle>Embed this event in your website</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Copy and paste the following code into your html
        </Typography>
        <CopyBlock text={code} language="javascript" theme={a11yLight} />
      </DialogContent>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({}));

export default EmbedSchedulerDialog;
