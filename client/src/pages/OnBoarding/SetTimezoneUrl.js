import React from "react";
import {
  Grid,
  Typography,
  TextField,
  MenuItem,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SetTimezoneUrl = (props) => {
  const classes = useStyles();

  const { url, setUrl, timezone, setTimezone } = props;

  return (
    <div className={classes.root}>
      <Grid
        container
        item
        wrap="nowrap"
        alignItems="center"
        className={classes.entry}
      >
        <Typography variant="subtitle1">Create your CalendApp URL:</Typography>
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
        <Typography variant="subtitle1">Select your time zone</Typography>
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

      <Grid container justify="center">
        <Button
          color="primary"
          variant="contained"
          className={classes.continueButton}
        >
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
  urlInputTextFormat: {
    fontWeight: 600,
  },
  timezoneMenu: {
    width: "5em",
    margin: "0 1em",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  continueButton: {
    background: theme.palette.primary.button,
    color: "white",
    padding: "15px 50px 15px 50px",
    position: "absolute",
    bottom: "2em",
    width: "3em",
  },
}));

SetTimezoneUrl.propTypes = {
  url: PropTypes.string,
  setUrl: PropTypes.func,
  timezone: PropTypes.string,
  setTimezone: PropTypes.func,
};

export default SetTimezoneUrl;
