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
        justify="flex-start"
        spacing={2}
        className={classes.entry}
      >
        <Grid item>
          <Typography variant="subtitle1">
            Create your CalendApp URL:
          </Typography>
        </Grid>

        <Grid
          container
          direction="row"
          alignItems="center"
          justify="flex-start"
          spacing={2}
          wrap="nowrap"
          item
          className={classes.groupedInput}
        >
          {/* TODO: pass in user link prefix */}
          <Grid className={classes.prefix} item>
            calendapp.com/
          </Grid>
          <Grid className={classes.url} item>
            <TextField
              name="link"
              variant="outlined"
              value={url}
              type="text"
              className={classes.urlText}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        item
        alignItems="center"
        spacing={2}
        className={classes.entry}
      >
        <Grid item>
          <Typography variant="subtitle1">Select your time zone</Typography>
        </Grid>
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
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "20em",
    width: "90%",
    margin: "0 auto",
  },
  entry: {
    margin: "1.5em 0",
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
  prefix: {
    fontSize: ".75rem",
    fontWeight: "600",
    color: "lightgrey",
    borderRight: "1px solid lightgrey",
    textAlign: "center",
  },
  url: {
    "& > * > * > input": {
      padding: "0",
    },
    "& > * > * > fieldset": {
      border: "none",
    },
  },
  urlText: {
    marginTop: ".2rem",
  },
  groupedInput: {
    border: "1px solid lightgray",
    borderRadius: "4px",
    height: "3rem",
    width: "50%",
    margin: 0,
    "&:hover": {
      borderColor: "black",
    },
    "&:focus-within": {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
      "& > *": {
        margin: "-1px 0",
      },
    },
  },
}));

SetTimezoneUrl.propTypes = {
  url: PropTypes.string,
  setUrl: PropTypes.func,
  timezone: PropTypes.string,
  setTimezone: PropTypes.func,
};

export default SetTimezoneUrl;
