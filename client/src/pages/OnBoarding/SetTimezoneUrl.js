import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  MenuItem,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import ProgressBar from "./smallComponents/ProgressBar";

const SetTimezoneUrl = (props) => {
  const classes = useStyles();

  const [url, setUrl] = useState("john-doe");
  const [timezone, setTimezone] = useState("");

  return (
    <div className={classes.root}>
      <Grid
        container
        item
        wrap="nowrap"
        alignItems="center"
        className={classes.entry}
      >
        <Typography>Create your CalendApp URL:</Typography>
        <TextField
          className={classes.urlPrefixInput}
          disabled
          variant="outlined"
          defaultValue="calendapp.com/"
          size="small"
        />
        <TextField
          className={classes.urlInput}
          required
          variant="outlined"
          size="small"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
      </Grid>

      <Grid container item alignItems="center" className={classes.entry}>
        <Typography>Select your time zone</Typography>
        <TextField
          select
          value={timezone}
          onChange={(e) => {
            setTimezone(e.target.value);
          }}
          className={classes.timezoneMenu}
        >
          {["UTC-12", "UTC-11", "UTC-10", "UTC-9"].map((item, i) => {
            return (
              <MenuItem value={item} key={i}>
                {item}
              </MenuItem>
            );
          })}
        </TextField>
      </Grid>

      <Grid container justify="center" className={classes.buttonGrid}>
        <Button color="primary" variant="contained">
          <Link to="/onboarding/2" className={classes.link}>
            Continue
          </Link>
        </Button>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "20em",
  },
  entry: {
    margin: "1.5em 2em",
  },
  urlPrefixInput: {
    width: "8em",
    lineHeight: "1.2em",
    margin: "0 0 0 1em",
  },
  urlInput: {
    margin: "0",
    width: "6em",
    lineHeight: "1.2em",
  },
  timezoneMenu: {
    width: "5em",
    margin: "0 1em",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  buttonGrid: {
    position: "absolute",
    bottom: "2em",
  },
}));

export default SetTimezoneUrl;
