import React from "react";
import {
  Grid,
  Typography,
  TextField,
  useTheme,
  Divider,
  Select,
  MenuItem,
  Menu,
} from "@material-ui/core";

import useStyles from "./useStylesHook";
import ProgressBar from "./ProgressBar";
import AvailableHours from "./smallComponents/AvailableHoursButton";

const SetAvailability = (props) => {
  //styles
  const classes = useStyles();
  const theme = useTheme();

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

export default SetAvailability;
