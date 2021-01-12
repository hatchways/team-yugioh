import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Divider,
  MenuItem,
  makeStyles,
} from "@material-ui/core";

import ProgressBar from "./smallComponents/ProgressBar";

const SetTimezoneUrl = (props) => {
  //styles
  const classes = useStyles();

  //two useRef objects below
  const url = props.url;
  const timezone = props.timezone;

  //local state
  const [urlLocal, setUrl] = useState("john-doe");
  const [timezoneLocal, setTimezone] = useState("");

  useEffect(() => {
    url.current = urlLocal;
    timezone.current = timezoneLocal;
  }, [urlLocal, timezoneLocal, url, timezone]);

  return (
    <div>
      <Grid
        container
        item
        wrap="nowrap"
        alignItems="center"
        justify="space-between"
        className={classes.topContent}
      >
        <Typography variant="h6">Welcome to CalendApp!</Typography>
        <ProgressBar start={0} end={1} />
      </Grid>

      <Divider />

      <Grid
        container
        item
        wrap="nowrap"
        alignItems="center"
        className={classes.pageOneEntry}
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
          value={urlLocal}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
      </Grid>

      <Grid container item alignItems="center" className={classes.pageOneEntry}>
        <Typography>Select your time zone</Typography>
        <TextField
          select
          value={timezoneLocal}
          onChange={(e) => {
            setTimezone(e.target.value);
          }}
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
  topContent: {
    padding: "2em",
    height: "6em",
  },
  pageOneEntry: {
    margin: "1.5em 2em",
  },
  urlPrefixInput: {
    width: "8em",
    lineHeight: "1.2em",
  },
  urlInput: {
    width: "6em",
    lineHeight: "1.2em",
  },
}));

export default SetTimezoneUrl;
