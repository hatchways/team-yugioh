import React from "react";
import { Grid, Typography, Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

import ProgressBar from "./smallComponents/ProgressBar";
import AvailableHours from "./smallComponents/AvailableHoursButton";
import AvailableDays from "./smallComponents/AvailableDays";

const SetAvailability = (props) => {
  //styles
  const classes = useStyles();

  //two useRef objects below
  const startHour = props.startHour;
  const finishHour = props.finishHour;
  const days = props.days;

  return (
    <div className={classes.root}>
      <Typography className={classes.pageThreeLabel}>
        Available hours
      </Typography>

      <Grid container className={classes.pageThreeEntry}>
        <AvailableHours hour={startHour} />
        <div>--</div>
        <AvailableHours hour={finishHour} />
      </Grid>

      <Typography className={classes.pageThreeLabel}>Available days</Typography>
      <Grid container className={classes.daysGrid}>
        <AvailableDays days={days} />
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
