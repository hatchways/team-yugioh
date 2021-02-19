import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  makeStyles,
  Grid,
  Button,
  Snackbar,
  Card,
} from "@material-ui/core";
import { DoneOutlined } from "@material-ui/icons";
import { CodeBlock, a11yLight } from "react-code-blocks";
import { CopyToClipboard } from "react-copy-to-clipboard";

const domain = window.location.origin;

const EmbedSchedulerDialog = ({
  showEmbedInstruction,
  setShowEmbedInstruction,
  link,
}) => {
  const [copied, setCopied] = useState(false);
  const whenCopiedToClipboard = () => {
    console.log("hi");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  const classes = useStyles();
  const [hostName, eventName] = link.split("/") || ["", ""];
  const code = `<div id="calend-app-inline-widget" data-url="${hostName}/${eventName}" style="min-width: 320px; height: 630px;"></div>\n<script type="text/javascript" src="${domain}/assets/widget/widget.bundle.js"></script>`;
  return (
    <>
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
          <div className={classes.contentPadding}>
            <Grid container>
              <Grid item xs={10}>
                <Typography variant="body1">
                  Copy and paste the following code into your html
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <CopyToClipboard text={code} onCopy={whenCopiedToClipboard}>
                  <Button
                    variant={copied ? "contained" : "outlined"}
                    color="secondary"
                    size="small"
                    className={classes.button}
                  >
                    {copied ? <DoneOutlined /> : "Copy code"}
                  </Button>
                </CopyToClipboard>
              </Grid>
            </Grid>
            <Card>
              <CodeBlock text={code} language="javascript" theme={a11yLight} />
            </Card>
          </div>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={copied}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        message="Code copied to clipboard"
      />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "none",
    height: 32,
    width: 80,
    marginRight: "4px",
  },
  contentPadding: {
    paddingBottom: "2em",
  },
}));

export default EmbedSchedulerDialog;
