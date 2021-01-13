import React, { useState } from "react";
import { Grid, Typography, Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

import AvailableHours from "./smallComponents/AvailableHoursButton";
import AvailableDays from "./smallComponents/AvailableDays";

const SetAvailability = (props) => {
  const classes = useStyles();

  const [startHour, setStartHour] = useState("");
  const [finishHour, setFinishHour] = useState("");
  const [days, setDays] = useState({});

  return (
    <div className={classes.root}>
      <Typography className={classes.pageThreeLabel}>
        Available hours
      </Typography>

      <Grid container className={classes.pageThreeEntry}>
        <AvailableHours hour={startHour} setHour={setStartHour} />
        <div>--</div>
        <AvailableHours hour={finishHour} setHour={setFinishHour} />
      </Grid>

      <Typography className={classes.pageThreeLabel}>Available days</Typography>
      <Grid container className={classes.daysGrid}>
        <AvailableDays days={days} setDays={setDays} />
      </Grid>

      <Grid container justify="center" className={classes.buttonGrid}>
        <Button color="primary" variant="contained">
          <Link to="/onboarding/3" className={classes.link}>
            Finish
          </Link>
        </Button>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
    height: "20em",
  },
  pageThreeLabel: {
    margin: "0.05em 2em",
  },
  pageThreeEntry: {
    margin: "1.5em 2em",
  },
  pageThreeMain: {
    margin: "1em 0",
  },
  daysGrid: {
    padding: "1em 2em",
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

export default SetAvailability;
