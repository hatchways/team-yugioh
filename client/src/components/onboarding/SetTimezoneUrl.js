import React, { useState, useCallback } from "react";
import {
  Grid,
  Typography,
  TextField,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import axios from "axios";
import InputAdornment from "@material-ui/core/InputAdornment";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { debounce } from "../../utils/utils";

const allTimezone = [
  -11,
  -10,
  -9,
  -8,
  -7,
  -6,
  -5,
  -4,
  -3,
  -2,
  -1,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
];

const SetTimezoneUrl = (props) => {
  const classes = useStyles();

  const { url, setUrl, timezone, setTimezone } = props;

  const [unique, setUnique] = useState(true);

  const checkUnique = async (linkVal) => {
    try {
      const response = await axios.get(`/api/user/is_unique?URL=${linkVal}`);
      if (response.status === 200);
      setUnique(true);
    } catch (err) {
      console.log(err);
      setUnique(false);
    }
  };

  const debounceCheckUnique = useCallback(() => {
    debounce(checkUnique, 500);
  }, []);

  const handleChange = (e) => {
    setUrl(e.target.value);
    debounceCheckUnique(e.target.value);
  };

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
              onChange={handleChange}
              fullWidth
              error={!unique}
              InputProps={{
                endAdornment: url.length ? (
                  <InputAdornment
                    position="start"
                    classes={{ positionStart: classes.endAdornment }}
                  >
                    {unique ? (
                      <DoneIcon className={classes.validIcon} />
                    ) : (
                      <ClearIcon className={classes.invalidIcon} />
                    )}
                  </InputAdornment>
                ) : undefined,
              }}
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
          {allTimezone.map((timezone, i) => {
            return (
              <MenuItem value={timezone} key={i}>
                UTC {timezone > 0 ? "+" : "-"} {timezone}
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
  continueButton: {
    background: theme.palette.primary.button,
    color: "white",
    padding: "15px 50px 15px 50px",
    position: "absolute",
    bottom: "2em",
    width: "3em",
  },
  endAdornment: {
    position: "absolute",
    left: 100,
    marginRight: -10,
  },
  validIcon: {
    color: "green",
    fontSize: 16,
  },
  invalidIcon: {
    color: "red",
    fontSize: 16,
  },
  noBorder: {
    bordre: "none",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
    border: "1px solid lightgray",
    borderRadius: "4px",
    marginLeft: 3,
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
