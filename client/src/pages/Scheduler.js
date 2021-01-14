import React from "react";
import { makeStyles, Paper, Grid, Divider } from "@material-ui/core";
import Overview from "../components/scheduler/Overview";
import PickDate from "../components/scheduler/PickDate";
import PickTime from "../components/scheduler/PickTime";

const data = () => {
  // Since I'm not sure how the data will be fetched or in what format,
  // I will use this for now to provide the component with data
};

const Scheduler = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={5}>
      <Grid container direction="row" wrap="nowrap" className={classes.grid}>
        <Overview />
        <Divider orientation="vertical" flexItem={true} />
        <PickDate />
        <Divider orientation="vertical" flexItem={true} />
        <PickTime />
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: theme.spacing(40),
      width: theme.spacing(80),
      margin: `${theme.spacing(10)}px auto`,
    },
    grid: {
      height: "100%",
    },
  };
});

export default Scheduler;
