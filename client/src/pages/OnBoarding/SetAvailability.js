import React from "react";
import { Grid, Typography, Divider, makeStyles } from "@material-ui/core";

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
    <div>
      <Grid
        container
        item
        wrap="nowrap"
        alignItems="center"
        justify="space-between"
        className={classes.topContent}
      >
        <Typography variant="h6">Set your availability</Typography>
        <ProgressBar start={2} end={3} />
      </Grid>

      <Divider />

      <div className={classes.pageThreeMain}>
        <Typography className={classes.pageThreeLabel}>
          Available hours
        </Typography>

        <Grid container className={classes.pageThreeEntry}>
          <AvailableHours hour={startHour} />
          <div>--</div>
          <AvailableHours hour={finishHour} />
        </Grid>

        <Typography className={classes.pageThreeLabel}>
          Available days
        </Typography>
        <Grid container className={classes.daysGrid}>
          <AvailableDays days={days} />
        </Grid>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  pageThreeRoot: {
    flexGrow: 1,
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
  topContent: {
    padding: "2em",
    height: "6em",
  },
}));

export default SetAvailability;
