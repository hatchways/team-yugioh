import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import Switch from "@material-ui/core/Switch";
import { DoneOutlined } from "@material-ui/icons";
import { deepOrange, grey } from "@material-ui/core/colors";
import Snackbar from "@material-ui/core/Snackbar";
import { Code } from "@material-ui/icons";

import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import EmbedSchedulerDialog from "./EmbedSchedulerDialog";

function DeleteEventDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Are you sure?</DialogTitle>
      <Typography
        variant="subtitle1"
        style={{ padding: "12px 15px", fontWeight: 400 }}
      >
        Deleting events are cannot be undone.
      </Typography>
      <DialogActions style={{ marginBottom: 8, marginRight: 5 }}>
        <Button
          onClick={() => props.deleteEvent()}
          color="secondary"
          variant="contained"
        >
          Yes
        </Button>
        <Button onClick={onClose} variant="outlined" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function EventCard({
  name,
  duration,
  color,
  link,
  active,
  _id,
  deleteEvent,
}) {
  const [eventActive, setEventActive] = useState(active);
  const [showEmbedInstruction, setShowEmbedInstruction] = useState(false);

  const useStyles = makeStyles({
    root: {
      "&:hover": {
        boxShadow:
          "0px 8px 17px 2px rgba(0,0,0,0.14) , 0px 3px 14px 2px rgba(0,0,0,0.12) , 0px 5px 5px -3px rgba(0,0,0,0.2) ",
      },
    },
    card: {
      minWidth: 275,
      opacity: !eventActive ? ".7" : 1,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    colorBar: {
      background: !eventActive ? "lightgrey" : color || deepOrange[500],
      padding: 4,
    },
    button: {
      textTransform: "none",
      height: 32,
      width: 80,
      marginRight: "4px",
    },
    duration: {
      marginLeft: "9.5px",
    },
    titleBox: {
      marginLeft: 0,
    },
    space: {
      padding: 12,
    },
  });
  const classes = useStyles();
  // CUSTOM BTN
  const DeleteBtn = withStyles({
    root: {
      color: "white",
      backgroundColor: grey[600],
      "&:hover": {
        backgroundColor: grey[800],
      },
      textTransform: "none",
      height: 32,
      width: 80,
      marginRight: "4px",
    },
  })(Button);
  // CUSTOM Tooltip
  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);

  const invitationLink = "http://localhost:3000/appt/" + link; // needs improvement
  const [copied, setCopied] = useState(false);
  const whenCopiedToClipboard = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleSwitch = () => {
    axios
      .put("/api/event/toggle-active", {
        active: !eventActive,
        eventId: _id,
      })
      .then(() => {
        setEventActive(!eventActive);
      })
      .catch((err) => console.log(err));
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const passIdToDeleteEvent = () => {
    deleteEvent(_id);
    setOpen(false);
    // added this setState because first card after a event was deleted would always switch to inactive
    setEventActive(true);
  };

  return (
    <>
      <Paper className={classes.root}>
        <Card className={classes.card}>
          <CardHeader className={classes.colorBar} />

          <CardContent>
            <Grid container>
              <Grid
                item
                xs={9}
                container
                direction="column"
                className={classes.titleBox}
              >
                <Typography variant="h5">
                  {name || duration + " minute meeting"}
                </Typography>

                <Typography variant="subtitle2" color="textSecondary">
                  One-on-One
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                container
                direction="column"
                alignItems="center"
                className={classes.cardContentTop}
              >
                <LightTooltip title="Turn On/Off" placement="bottom">
                  <Switch
                    size="small"
                    color="primary"
                    checked={eventActive}
                    onChange={handleSwitch}
                  />
                </LightTooltip>
                <Button
                  className={classes.codeButton}
                  onClick={() => {
                    setShowEmbedInstruction(true);
                  }}
                >
                  <Code />
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2" className={classes.duration}>
                {duration} min
              </Typography>

              {eventActive ? (
                <CopyToClipboard
                  text={invitationLink}
                  onCopy={whenCopiedToClipboard}
                >
                  <Button
                    variant={copied ? "contained" : "outlined"}
                    color="secondary"
                    size="small"
                    className={classes.button}
                  >
                    {copied ? <DoneOutlined /> : "Copy link"}
                  </Button>
                </CopyToClipboard>
              ) : (
                <DeleteBtn
                  variant="outlined"
                  size="small"
                  onClick={handleClickOpen}
                >
                  Delete
                </DeleteBtn>
              )}
            </Grid>
          </CardActions>
        </Card>
      </Paper>
      <Snackbar
        open={copied}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        message="Invitation link copied to clipboard"
      />
      <DeleteEventDialog
        deleteEvent={passIdToDeleteEvent}
        open={open}
        onClose={handleClose}
      />
      <EmbedSchedulerDialog
        showEmbedInstruction={showEmbedInstruction}
        setShowEmbedInstruction={setShowEmbedInstruction}
        link={link}
      />
    </>
  );
}

EventCard.propTypes = {
  name: PropTypes.string,
  duration: PropTypes.number,
  color: PropTypes.string,
  link: PropTypes.string,
};
