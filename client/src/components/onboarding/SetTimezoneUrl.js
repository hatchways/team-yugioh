import React, { useState, Fragment } from "react";
import {
  Grid,
  Typography,
  TextField,
  MenuItem,
  makeStyles,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import InputAdornment from "@material-ui/core/InputAdornment";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";

const SetTimezoneUrl = props => {
  const classes = useStyles();

  const { url, setUrl, timezone, setTimezone } = props;

  const [unique, setUnique] = useState(true);
  const handleChange = async e => {
    setUrl(e.target.value);
    try {
      const response = await axios.get(
        `/api/user/is_unique?URL=${e.target.value}`
      );
      console.log(response.status);
      console.log(unique);
      if (response.status === 200);
      setUnique(true);
    } catch (err) {
      console.log(err);
      setUnique(false);
    }
  };

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
        <div className={classes.link}>
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
          onChange={handleChange}
          error={!unique}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start" classes={{positionStart:classes.endAdornment}} >
                {url.length>0 ? unique? (
                  <DoneIcon className={classes.validIcon} />
                ) : (
                  <ClearIcon className={classes.invalidIcon} />
                ):null}
              </InputAdornment>
            )
          }}
        />
        </div>
      </Grid>

      <Grid container item alignItems="center" className={classes.entry}>
        <Typography variant="subtitle1">Select your time zone</Typography>
        <TextField
          select
          value={timezone}
          onChange={e => {
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

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    height: "20em"
  },
  entry: {
    margin: "1.5em 2em"
  },
  urlPrefixInput: {
    width: "8em",
    lineHeight: "1.2em",
    margin: "0 0 0 1em"
  },
  urlInput: {
    margin: "0",
    width: "6em",
    lineHeight: "1.2em"
  },
  urlInputTextFormat: {
    fontWeight: 600
  },
  timezoneMenu: {
    width: "5em",
    margin: "0 1em"
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.white
  },
  continueButton: {
    background: theme.palette.primary.button,
    color: "white",
    padding: "15px 50px 15px 50px",
    position: "absolute",
    bottom: "2em",
    width: "3em"
  },
  endAdornment: {
    position: "absolute",
    left: 100
  },
  validIcon: {
    color: "green",
    fontSize: 16
  },
  invalidIcon: {
    color: "red",
    fontSize: 16
  },
  noBorder:{
    bordre:"none"
  },
  link: {
    border: "1px solid lightgray",
    borderRadius: "4px",
    marginLeft:3,
    "& > *": {
        margin: "-1px 0",
      },
    "&:hover": {
      borderColor: "black",
    },
    "&:focus-within": {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
      
    },
    "& > * > * > input": {
      padding: "8px",
    },
    "& > * > * > fieldset": {
      border: "none",
    },
  },
  endAdornment: {
    marginRight:-10
  }
}));

SetTimezoneUrl.propTypes = {
  url: PropTypes.string,
  setUrl: PropTypes.func,
  timezone: PropTypes.string,
  setTimezone: PropTypes.func
};

export default SetTimezoneUrl;
