import React from "react";
import {
  Grid,
  Typography,
  TextField,
  useTheme,
  Divider,
  makeStyles,
} from "@material-ui/core";

import ProgressBar from "./smallComponents/ProgressBar";
import AvailableHours from "./smallComponents/AvailableHoursButton";

const SetAvailability = (props) => {
  //styles
  const classes = useStyles();

  //two useRef objects below
  const hours = props.hours;
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
          <AvailableHours />
          <div>--</div>
          <AvailableHours />
        </Grid>

        <Typography className={classes.pageThreeLabel}>
          Available days
        </Typography>
        <Grid container className={classes.pageThreeEntry}>
          <TextField></TextField>
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
  topContent: {
    padding: "2em",
    height: "6em",
  },
}));

export default SetAvailability;
