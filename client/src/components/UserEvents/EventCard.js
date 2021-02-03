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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { DoneOutlined } from "@material-ui/icons";
import { deepOrange, grey, indigo } from "@material-ui/core/colors";
import Snackbar from "@material-ui/core/Snackbar";

import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function EventCard({
  name,
  duration,
  color,
  link,
  active,
  _id,
}) {
  const [eventActive, setEventActive] = useState(active);
  const [switchToggle, setSwitchToggle] = useState(active);

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
    cardContentTop: {
      marginTop: "-15px",
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

  const TurnOnBtn = withStyles({
    root: {
      color: "white",
      backgroundColor: indigo[400],
      "&:hover": {
        backgroundColor: indigo[700],
      },
      textTransform: "none",
      height: 32,
      width: 80,
      marginRight: "4px",
    },
  })(Button);

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
        setSwitchToggle(!switchToggle);
        setTimeout(() => {
          setEventActive(!eventActive);
        }, 300);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Paper className={classes.root}>
        <Card className={classes.card}>
          <CardHeader className={classes.colorBar} />

          <CardContent>
            <Grid container direction="column">
              <Grid
                container
                justify="flex-end"
                className={classes.cardContentTop}
              >
                {eventActive ? (
                  <FormControlLabel
                    labelPlacement="start"
                    control={
                      <Switch
                        size="small"
                        color="primary"
                        checked={switchToggle}
                        onChange={handleSwitch}
                      />
                    }
                    label="On/Off"
                  />
                ) : (
                  <div className={classes.space}></div>
                )}
              </Grid>
              <Grid className={classes.titleBox}>
                <Typography variant="h5">
                  {name || duration + " minute meeting"}
                </Typography>

                <Typography variant="subtitle2" color="textSecondary">
                  One-on-One
                </Typography>
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
                <TurnOnBtn
                  variant="outlined"
                  size="small"
                  onClick={handleSwitch}
                >
                  Turn on
                </TurnOnBtn>
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
    </>
  );
}

EventCard.propTypes = {
  name: PropTypes.string,
  duration: PropTypes.number,
  color: PropTypes.string,
  link: PropTypes.string,
};
