import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  Grid,
  Divider,
  Typography,
} from "@material-ui/core";
import Overview from "../components/scheduler/Overview";
import PickDate from "../components/scheduler/PickDate";
import PickTime from "../components/scheduler/PickTime";

const Scheduler = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <Paper className={classes.root} elevation={5}>
      <Grid container direction="row" wrap="nowrap" className={classes.grid}>
        <Grid item xs={4}>
          <Overview />
        </Grid>
        <Divider orientation="vertical" flexItem={true} />

        <Grid
          item
          xs={8}
          className={classes.dateTimeSelect}
          container
          direction="column"
          wrap="nowrap"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h5" className={classes.title}>
              Select a Date {"&"} Time
            </Typography>
          </Grid>

          <Grid item container spacing={2}>
            <Grid item xs={7}>
              <PickDate
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
              <Typography variant="subtitle2">
                Coordinated Universal Time
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <PickTime selectedDate={selectedDate} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: theme.spacing(60),
      width: theme.spacing(100),
      margin: `${theme.spacing(10)}px auto`,
    },
    grid: {
      height: "100%",
    },
    title: {},
    dateTimeSelect: {
      padding: theme.spacing(3),
    },
  };
});

export default Scheduler;
